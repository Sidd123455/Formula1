// Enhanced Navbar Functionality
const navbar = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.nav-links a'),
    menuToggle: document.querySelector('.menu-toggle'),
    navLinksContainer: document.querySelector('.nav-links'),
    lastScrollTop: 0,
    scrollThreshold: 100,
    
    init() {
        if (!this.navbar) return;
        
        this.setupScrollBehavior();
        this.setupActiveSectionTracking();
        this.setupMobileMenu();
        this.setupHoverEffects();
    },
    
    setupScrollBehavior() {
        // Hide/show navbar on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for styling
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Auto-hide navbar when scrolling down, show when scrolling up
            if (scrollTop > this.lastScrollTop && scrollTop > this.scrollThreshold) {
                this.navbar.classList.add('navbar-hidden');
            } else {
                this.navbar.classList.remove('navbar-hidden');
            }
            
            this.lastScrollTop = scrollTop;
        });
    },
    
    setupActiveSectionTracking() {
        // Track which section is currently in view
        const sections = document.querySelectorAll('section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveNavLink(id);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    },
    
    setActiveNavLink(sectionId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Remove active class from parent li if it exists
            const parentLi = link.parentElement;
            if (parentLi) {
                parentLi.classList.remove('active');
            }
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            
            // Add active class to parent li
            const parentLi = activeLink.parentElement;
            if (parentLi) {
                parentLi.classList.add('active');
            }
        }
    },
    
    setupMobileMenu() {
        if (!this.menuToggle) return;
        
        this.menuToggle.addEventListener('click', () => {
            this.navLinksContainer.classList.toggle('active');
            this.menuToggle.classList.toggle('active');
            
            // Toggle aria-expanded attribute
            const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
            this.menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navLinksContainer.classList.contains('active')) {
                this.navLinksContainer.classList.remove('active');
                this.menuToggle.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navLinksContainer.classList.contains('active')) {
                    this.navLinksContainer.classList.remove('active');
                    this.menuToggle.classList.remove('active');
                    this.menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    },
    
    setupHoverEffects() {
        // Add hover effect to nav links
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('hover');
            });
            
            link.addEventListener('mouseleave', () => {
                link.classList.remove('hover');
            });
        });
    }
};

// Initialize navbar
navbar.init();

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Team cards hover effect
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Driver cards hover effect
document.querySelectorAll('.driver-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Race event hover effect
document.querySelectorAll('.race-event').forEach(event => {
    event.addEventListener('mouseenter', () => {
        event.style.transform = 'translateX(10px)';
        event.style.backgroundColor = '#e0e0e0';
    });
    
    event.addEventListener('mouseleave', () => {
        event.style.transform = 'translateX(0)';
        event.style.backgroundColor = '#f4f4f4';
    });
});

// Car Slider Functionality
const carSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.car-slide'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.car-prev'),
    nextBtn: document.querySelector('.car-next'),
    autoSlideInterval: null,

    init() {
        if (!this.slides.length) return;
        
        this.showSlide(this.currentSlide);
        this.addEventListeners();
        this.startAutoSlide();
    },

    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Calculate the correct index (handle wrapping)
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        // Add active class to current slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    },

    goToSlide(index) {
        this.showSlide(index);
    },

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    },

    addEventListeners() {
        // Previous and next buttons
        this.prevBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.prevSlide();
            this.startAutoSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoSlide();
            this.nextSlide();
            this.startAutoSlide();
        });
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoSlide();
                this.goToSlide(index);
                this.startAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        const slider = document.querySelector('.car-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
};

// Car Comparison Chart
const carComparisonChart = {
    chart: null,
    carData: {
        ferrari: {
            name: 'Ferrari SF-24',
            topSpeed: 338,
            acceleration: 2.6,
            power: 1000,
            weight: 798,
            downforce: 95
        },
        redbull: {
            name: 'Red Bull RB20',
            topSpeed: 340,
            acceleration: 2.5,
            power: 1000,
            weight: 798,
            downforce: 98
        },
        mercedes: {
            name: 'Mercedes W15',
            topSpeed: 335,
            acceleration: 2.7,
            power: 1000,
            weight: 798,
            downforce: 92
        },
        mclaren: {
            name: 'McLaren MCL38',
            topSpeed: 332,
            acceleration: 2.8,
            power: 1000,
            weight: 798,
            downforce: 90
        },
        astonmartin: {
            name: 'Aston Martin AMR24',
            topSpeed: 330,
            acceleration: 2.9,
            power: 1000,
            weight: 798,
            downforce: 88
        }
    },

    init() {
        const ctx = document.getElementById('carComparisonChart');
        if (!ctx) return;

        // Create initial chart
        this.createChart(ctx);
        
        // Add event listeners to selectors
        const car1Select = document.getElementById('car1-select');
        const car2Select = document.getElementById('car2-select');
        
        if (car1Select && car2Select) {
            car1Select.addEventListener('change', () => this.updateChart());
            car2Select.addEventListener('change', () => this.updateChart());
        }
    },

    createChart(ctx) {
        const car1 = document.getElementById('car1-select').value;
        const car2 = document.getElementById('car2-select').value;
        
        const data = {
            labels: ['Top Speed', 'Acceleration', 'Power', 'Weight', 'Downforce'],
            datasets: [
                {
                    label: this.carData[car1].name,
                    data: [
                        this.carData[car1].topSpeed,
                        this.carData[car1].acceleration,
                        this.carData[car1].power,
                        this.carData[car1].weight,
                        this.carData[car1].downforce
                    ],
                    backgroundColor: 'rgba(220, 0, 0, 0.7)',
                    borderColor: 'rgba(220, 0, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: this.carData[car2].name,
                    data: [
                        this.carData[car2].topSpeed,
                        this.carData[car2].acceleration,
                        this.carData[car2].power,
                        this.carData[car2].weight,
                        this.carData[car2].downforce
                    ],
                    backgroundColor: 'rgba(6, 0, 239, 0.7)',
                    borderColor: 'rgba(6, 0, 239, 1)',
                    borderWidth: 1
                }
            ]
        };

        const config = {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 1000
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'F1 Car Comparison'
                    }
                }
            }
        };

        this.chart = new Chart(ctx, config);
    },

    updateChart() {
        if (!this.chart) return;
        
        const car1 = document.getElementById('car1-select').value;
        const car2 = document.getElementById('car2-select').value;
        
        this.chart.data.datasets[0].label = this.carData[car1].name;
        this.chart.data.datasets[0].data = [
            this.carData[car1].topSpeed,
            this.carData[car1].acceleration,
            this.carData[car1].power,
            this.carData[car1].weight,
            this.carData[car1].downforce
        ];
        
        this.chart.data.datasets[1].label = this.carData[car2].name;
        this.chart.data.datasets[1].data = [
            this.carData[car2].topSpeed,
            this.carData[car2].acceleration,
            this.carData[car2].power,
            this.carData[car2].weight,
            this.carData[car2].downforce
        ];
        
        this.chart.update();
    }
};

// 360° Car Viewer
const car360Viewer = {
    currentView: 'front',
    carImages: {
        ferrari: {
            front: 'HD-wallpaper-red-ferrari-sf-24-2024-formula-one-car-ultra-sports-formula-1-ferrari-formulaone-2024.jpg',
            side: 'formula-1-2023-red-race-car-ferrari-wallpaper-2880x1620_52.jpg',
            rear: 'formula-1-formula-cars-red-bull-racing-mercedes-f1-hd-wallpaper-preview.jpg',
            top: 'M484079.jpg'
        },
        redbull: {
            front: 'thumb2-2025-red-bull-racing-rb21-4k-formula-1-racing-car-2025.jpg',
            side: 'formula-1-formula-cars-red-bull-racing-mercedes-f1-hd-wallpaper-preview.jpg',
            rear: 'HD-wallpaper-red-ferrari-sf-24-2024-formula-one-car-ultra-sports-formula-1-ferrari-formulaone-2024.jpg',
            top: 'M484079.jpg'
        },
        mercedes: {
            front: 'M484079.jpg',
            side: 'mercedes-benz-mercedes-amg-f1-car-formula-1-wallpaper-preview.jpg',
            rear: 'formula-1-formula-cars-red-bull-racing-mercedes-f1-hd-wallpaper-preview.jpg',
            top: 'HD-wallpaper-red-ferrari-sf-24-2024-formula-one-car-ultra-sports-formula-1-ferrari-formulaone-2024.jpg'
        }
    },
    currentCar: 'ferrari',

    init() {
        const viewerBtns = document.querySelectorAll('.viewer-btn');
        if (!viewerBtns.length) return;
        
        viewerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.getAttribute('data-view');
                this.changeView(view);
                
                // Update active button
                viewerBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Add car selection if available
        const carSelect = document.createElement('select');
        carSelect.id = 'car-selector';
        carSelect.innerHTML = `
            <option value="ferrari">Ferrari SF-24</option>
            <option value="redbull">Red Bull RB20</option>
            <option value="mercedes">Mercedes W15</option>
        `;
        
        const viewerControls = document.querySelector('.viewer-controls');
        if (viewerControls) {
            viewerControls.appendChild(carSelect);
            
            carSelect.addEventListener('change', () => {
                this.currentCar = carSelect.value;
                this.changeView(this.currentView);
            });
        }
    },

    changeView(view) {
        this.currentView = view;
        const img = document.getElementById('car-360-img');
        if (img && this.carImages[this.currentCar] && this.carImages[this.currentCar][view]) {
            img.src = this.carImages[this.currentCar][view];
        }
    }
};

// Car Details Modal
const carDetailsModal = {
    modal: null,
    carDetails: {
        ferrari: {
            name: 'Ferrari SF-24',
            description: 'The Ferrari SF-24 is the latest Formula 1 car from Scuderia Ferrari, designed for the 2024 season. It features advanced aerodynamics, a powerful hybrid power unit, and cutting-edge technology.',
            specs: {
                engine: '1.6L V6 Turbo Hybrid',
                power: '1000+ HP',
                weight: '798 kg',
                topSpeed: '338 km/h',
                acceleration: '0-100 km/h in 2.6s',
                transmission: '8-speed sequential',
                brakes: 'Carbon fiber discs',
                tires: 'Pirelli P Zero'
            },
            drivers: ['Charles Leclerc', 'Carlos Sainz'],
            teamPrincipal: 'Frédéric Vasseur',
            firstRace: '2024 Bahrain Grand Prix'
        },
        redbull: {
            name: 'Red Bull RB20',
            description: 'The Red Bull RB20 is the 2024 Formula 1 car from Red Bull Racing. It builds on the success of the dominant RB19, with further refinements to aerodynamics and performance.',
            specs: {
                engine: '1.6L V6 Turbo Hybrid',
                power: '1000+ HP',
                weight: '798 kg',
                topSpeed: '340 km/h',
                acceleration: '0-100 km/h in 2.5s',
                transmission: '8-speed sequential',
                brakes: 'Carbon fiber discs',
                tires: 'Pirelli P Zero'
            },
            drivers: ['Max Verstappen', 'Sergio Pérez'],
            teamPrincipal: 'Christian Horner',
            firstRace: '2024 Bahrain Grand Prix'
        },
        mercedes: {
            name: 'Mercedes W15',
            description: 'The Mercedes W15 is the 2024 Formula 1 car from Mercedes-AMG Petronas. It represents a complete redesign following the team\'s challenging 2023 season, with a focus on improved performance and reliability.',
            specs: {
                engine: '1.6L V6 Turbo Hybrid',
                power: '1000+ HP',
                weight: '798 kg',
                topSpeed: '335 km/h',
                acceleration: '0-100 km/h in 2.7s',
                transmission: '8-speed sequential',
                brakes: 'Carbon fiber discs',
                tires: 'Pirelli P Zero'
            },
            drivers: ['Lewis Hamilton', 'George Russell'],
            teamPrincipal: 'Toto Wolff',
            firstRace: '2024 Bahrain Grand Prix'
        }
    },

    init() {
        // Create modal if it doesn't exist
        if (!document.getElementById('car-modal')) {
            this.createModal();
        }
        
        // Add event listeners to car detail buttons
        const detailBtns = document.querySelectorAll('.car-details-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const slide = e.target.closest('.car-slide');
                const carName = slide.querySelector('h3').textContent.toLowerCase();
                const carId = this.getCarIdFromName(carName);
                this.openModal(carId);
            });
        });
    },

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'car-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body">
                    <h2 id="modal-car-name">Car Name</h2>
                    <div class="modal-car-image">
                        <img id="modal-car-img" src="" alt="Car">
                    </div>
                    <div class="modal-car-info">
                        <p id="modal-car-description">Car description goes here.</p>
                        <div class="modal-car-specs">
                            <h3>Specifications</h3>
                            <div class="specs-grid">
                                <div class="spec-item">
                                    <span class="spec-label">Engine</span>
                                    <span class="spec-value" id="modal-car-engine">-</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Power</span>
                                    <span class="spec-value" id="modal-car-power">-</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Weight</span>
                                    <span class="spec-value" id="modal-car-weight">-</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Top Speed</span>
                                    <span class="spec-value" id="modal-car-topspeed">-</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Acceleration</span>
                                    <span class="spec-value" id="modal-car-acceleration">-</span>
                                </div>
                                <div class="spec-item">
                                    <span class="spec-label">Transmission</span>
                                    <span class="spec-value" id="modal-car-transmission">-</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-car-team">
                            <h3>Team Information</h3>
                            <p><strong>Drivers:</strong> <span id="modal-car-drivers">-</span></p>
                            <p><strong>Team Principal:</strong> <span id="modal-car-principal">-</span></p>
                            <p><strong>First Race:</strong> <span id="modal-car-firstrace">-</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener to close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        // Add event listener to close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        this.modal = modal;
    },

    getCarIdFromName(name) {
        if (name.includes('ferrari')) return 'ferrari';
        if (name.includes('red bull')) return 'redbull';
        if (name.includes('mercedes')) return 'mercedes';
        return 'ferrari'; // Default
    },

    openModal(carId) {
        if (!this.modal) this.createModal();
        
        const car = this.carDetails[carId];
        if (!car) return;
        
        // Update modal content
        document.getElementById('modal-car-name').textContent = car.name;
        document.getElementById('modal-car-img').src = car360Viewer.carImages[carId].front;
        document.getElementById('modal-car-description').textContent = car.description;
        
        // Update specs
        document.getElementById('modal-car-engine').textContent = car.specs.engine;
        document.getElementById('modal-car-power').textContent = car.specs.power;
        document.getElementById('modal-car-weight').textContent = car.specs.weight;
        document.getElementById('modal-car-topspeed').textContent = car.specs.topSpeed;
        document.getElementById('modal-car-acceleration').textContent = car.specs.acceleration;
        document.getElementById('modal-car-transmission').textContent = car.specs.transmission;
        
        // Update team info
        document.getElementById('modal-car-drivers').textContent = car.drivers.join(' & ');
        document.getElementById('modal-car-principal').textContent = car.teamPrincipal;
        document.getElementById('modal-car-firstrace').textContent = car.firstRace;
        
        // Show modal
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};

// Team modal
const teamModal = document.getElementById('team-modal');
const teamCards = document.querySelectorAll('.team-card');
const modalTeamName = document.getElementById('modal-team-name');
const modalTeamImg = document.getElementById('modal-team-img');
const modalTeamDescription = document.getElementById('modal-team-description');
const modalTeamChampionships = document.getElementById('modal-team-championships');
const modalTeamWins = document.getElementById('modal-team-wins');
const modalTeamPoles = document.getElementById('modal-team-poles');
const modalClose = document.querySelectorAll('.modal-close');

// Team data
const teamData = {
    ferrari: {
        name: 'Ferrari',
        image: 'formula-1-2023-red-race-car-ferrari-wallpaper-2880x1620_52.jpg',
        description: 'Scuderia Ferrari is the racing division of luxury Italian auto manufacturer Ferrari and the oldest racing team in Formula 1, having competed in every world championship since 1950.',
        championships: 16,
        wins: 243,
        poles: 243
    },
    mercedes: {
        name: 'Mercedes',
        image: 'mercedes-benz-mercedes-amg-f1-car-formula-1-wallpaper-preview.jpg',
        description: 'Mercedes-Benz has been involved in Formula 1 as a team owner, operator, constructor and engine manufacturer for various periods since 1954.',
        championships: 8,
        wins: 125,
        poles: 135
    },
    redbull: {
        name: 'Red Bull Racing',
        image: 'thumb2-2025-red-bull-racing-rb21-4k-formula-1-racing-car-2025.jpg',
        description: 'Red Bull Racing is a Formula One racing team, competing under an Austrian licence and based in the United Kingdom. It is one of two Formula One teams owned by beverage company Red Bull GmbH.',
        championships: 6,
        wins: 118,
        poles: 85
    },
    astonmartin: {
        name: 'Aston Martin',
        image: 'formula-1-aston-martin-aston-martin-f1-race-cars-british-racing-green-hd-wallpaper-preview.jpg',
        description: 'Aston Martin F1 Team is a British Formula One team based in Silverstone, United Kingdom. The team is owned by Lawrence Stroll and competes under a British licence.',
        championships: 0,
        wins: 0,
        poles: 1
    }
};

teamCards.forEach(card => {
    card.addEventListener('click', () => {
        const teamId = card.getAttribute('data-team');
        const team = teamData[teamId];
        
        modalTeamName.textContent = team.name;
        modalTeamImg.src = team.image;
        modalTeamDescription.textContent = team.description;
        modalTeamChampionships.textContent = team.championships;
        modalTeamWins.textContent = team.wins;
        modalTeamPoles.textContent = team.poles;
        
        teamModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Driver modal
const driverModal = document.getElementById('driver-modal');
const driverCards = document.querySelectorAll('.driver-card');
const modalDriverName = document.getElementById('modal-driver-name');
const modalDriverImg = document.getElementById('modal-driver-img');
const modalDriverDescription = document.getElementById('modal-driver-description');
const modalDriverChampionships = document.getElementById('modal-driver-championships');
const modalDriverWins = document.getElementById('modal-driver-wins');
const modalDriverPoles = document.getElementById('modal-driver-poles');

// Driver data
const driverData = {
    verstappen: {
        name: 'Max Verstappen',
        image: 'verstappen.avif',
        description: 'Max Verstappen is a Dutch racing driver who competes in Formula One for Red Bull Racing. He is a three-time Formula One World Champion, having won the championship in 2021, 2022, and 2023.',
        championships: 3,
        wins: 54,
        poles: 30
    },
    hamilton: {
        name: 'Lewis Hamilton',
        image: 'lewis-hamilton-mercedes-f1-w15.jpg',
        description: 'Lewis Hamilton is a British racing driver who competes in Formula One for Mercedes. He has won a joint-record seven Formula One World Drivers\' Championship titles, tied with Michael Schumacher.',
        championships: 7,
        wins: 103,
        poles: 104
    }
};

driverCards.forEach(card => {
    card.addEventListener('click', () => {
        const driverId = card.getAttribute('data-driver');
        const driver = driverData[driverId];
        
        modalDriverName.textContent = driver.name;
        modalDriverImg.src = driver.image;
        modalDriverDescription.textContent = driver.description;
        modalDriverChampionships.textContent = driver.championships;
        modalDriverWins.textContent = driver.wins;
        modalDriverPoles.textContent = driver.poles;
        
        driverModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modals
modalClose.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        teamModal.style.display = 'none';
        driverModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === teamModal) {
        teamModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === driverModal) {
        driverModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}! You will receive updates soon.`);
    newsletterForm.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page with fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';

// Initialize all car page features
document.addEventListener('DOMContentLoaded', () => {
    carSlider.init();
    carComparisonChart.init();
    car360Viewer.init();
    carDetailsModal.init();
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    const loader = document.querySelector('.loader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 5;
        loadingProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 500);
        }
    }, 100);
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    let lastScrollTop = 0;
    
    // Add smooth scroll functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinksContainer = document.querySelector('.nav-links');
                
                if (menuToggle && navLinksContainer.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinksContainer.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar show/hide on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        // Add scrolled class to navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active section in navigation
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && navLinksContainer.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuToggle && navLinksContainer.classList.contains('active') && 
            !navLinksContainer.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Team cards hover effect
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Driver cards hover effect
    const driverCards = document.querySelectorAll('.driver-card');
    
    driverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Car slider functionality
    const carSlides = document.querySelectorAll('.car-slide');
    const carDots = document.querySelectorAll('.dot');
    const carPrevBtn = document.querySelector('.car-prev');
    const carNextBtn = document.querySelector('.car-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        carSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        carDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        carSlides[index].classList.add('active');
        carDots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carSlides.length) % carSlides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    if (carSlides.length > 0) {
        showSlide(currentSlide);
        
        // Auto advance slides
        setInterval(nextSlide, 5000);
        
        // Event listeners for car controls
        if (carNextBtn) carNextBtn.addEventListener('click', nextSlide);
        if (carPrevBtn) carPrevBtn.addEventListener('click', prevSlide);
        
        carDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Track cards hover effect
    const trackCards = document.querySelectorAll('.track-card');
    
    trackCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const galleryModalContent = document.querySelector('.gallery-modal-content');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryCaption = document.querySelector('.gallery-caption');
    
    if (galleryItems.length > 0 && galleryModal && galleryModalContent && galleryClose && galleryCaption) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');
                
                galleryModalContent.setAttribute('src', imgSrc);
                galleryCaption.textContent = imgAlt;
                galleryModal.style.display = 'flex';
            });
        });
        
        galleryClose.addEventListener('click', function() {
            galleryModal.style.display = 'none';
        });
        
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
            }
        });
    }
    
    // Team and driver modal functionality
    const teamDetailsBtns = document.querySelectorAll('.team-details-btn');
    const driverDetailsBtns = document.querySelectorAll('.driver-details-btn');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    
    function openModal(content) {
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }
    
    if (teamDetailsBtns.length > 0 && modal && modalClose) {
        teamDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const teamCard = this.closest('.team-card');
                const teamName = teamCard.querySelector('h3').textContent;
                const teamImage = teamCard.querySelector('img').getAttribute('src');
                
                const modalContent = `
                    <h2>${teamName}</h2>
                    <div class="modal-team-image">
                        <img src="${teamImage}" alt="${teamName}">
                    </div>
                    <div class="modal-team-info">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>
                    <div class="modal-team-stats">
                        <div class="stat">
                            <div class="stat-value">8</div>
                            <div class="stat-label">Championships</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">150</div>
                            <div class="stat-label">Race Wins</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">450</div>
                            <div class="stat-label">Podiums</div>
                        </div>
                    </div>
                `;
                
                openModal(modalContent);
            });
        });
    }
    
    if (driverDetailsBtns.length > 0 && modal && modalClose) {
        driverDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const driverCard = this.closest('.driver-card');
                const driverName = driverCard.querySelector('h3').textContent;
                const driverImage = driverCard.querySelector('img').getAttribute('src');
                
                const modalContent = `
                    <h2>${driverName}</h2>
                    <div class="modal-driver-image">
                        <img src="${driverImage}" alt="${driverName}">
                    </div>
                    <div class="modal-driver-info">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>
                    <div class="modal-driver-stats">
                        <div class="stat">
                            <div class="stat-value">3</div>
                            <div class="stat-label">Championships</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">45</div>
                            <div class="stat-label">Race Wins</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">95</div>
                            <div class="stat-label">Podiums</div>
                        </div>
                    </div>
                `;
                
                openModal(modalContent);
            });
        });
    }
    
    if (modalClose && modal) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate form submission
                emailInput.value = '';
                alert('Thank you for subscribing to our newsletter!');
            }
        });
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.team-card, .driver-card, .track-card, .race-event, .gallery-item');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements with opacity 0 and slight Y offset
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check for elements in view on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
});

// Video Controls
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    
    // Add sound control button
    const soundControl = document.createElement('button');
    soundControl.className = 'sound-control';
    soundControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
    document.querySelector('.hero').appendChild(soundControl);
    
    // Toggle sound
    soundControl.addEventListener('click', function() {
        if (heroVideo.muted) {
            heroVideo.muted = false;
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            heroVideo.muted = true;
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Ensure video plays on mobile
    heroVideo.addEventListener('play', function() {
        console.log('Video started playing');
    });
    
    heroVideo.addEventListener('error', function(e) {
        console.error('Error playing video:', e);
    });
    
    // Add play/pause on click
    heroVideo.addEventListener('click', function() {
        if (heroVideo.paused) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }
    });
}); 
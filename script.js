document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggles = document.querySelectorAll('input[type="checkbox"]');
    const navToggleButton = document.getElementById('nav-toggle-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileNavLinks = mobileNavMenu.querySelectorAll('a');

    // --- Theme Toggler Logic ---
    function applyTheme(theme, shouldUpdateToggles) {
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
        if (shouldUpdateToggles) {
            themeToggles.forEach(toggle => {
                toggle.checked = (theme === 'light');
            });
        }
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme, true);
        });
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme, true);

    // --- Age Calculation Logic ---
    function calculateAge() {
        const birthDate = new Date('2001-11-19');
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // If birthday hasn't occurred this year yet, subtract 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    // Update age display
    const ageDisplay = document.getElementById('age-display');
    if (ageDisplay) {
        ageDisplay.textContent = calculateAge();
    }

    // --- Mobile Navigation Logic ---
    const mobileNavClose = document.getElementById('mobile-nav-close');
    
    function closeMobileNav() {
        mobileNavMenu.classList.remove('show-nav');
        const icon = navToggleButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    if (navToggleButton && mobileNavMenu) {
        navToggleButton.addEventListener('click', () => {
            mobileNavMenu.classList.toggle('show-nav');
            const icon = navToggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', closeMobileNav);
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
        
        // Close mobile nav when clicking outside
        mobileNavMenu.addEventListener('click', (e) => {
            if (e.target === mobileNavMenu) {
                closeMobileNav();
            }
        });
    }

    // --- Typing Animation Logic ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const phrases = ["Machine Learning Engineer", "Freelancer", "Prompt Engineer", "Creative Problem Solver"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                // Deleting text
                typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing text
                typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 75 : 150;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('main, .content-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) { current = section.getAttribute('id'); }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) { link.classList.add('active'); }
        });
    });

    // --- Animation on Scroll Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    const elementsToAnimate = document.querySelectorAll('.edu-container, .exp-container, .list-item');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Stagger animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .timeline-entry, .timeline-item-card, .experience-card');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        timelineItems.forEach(item => timelineObserver.observe(item));
    }
    
    // --- Initialize Swiper (Desktop/Tablet) ---
    var swiper = new Swiper(".desktop-swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1, // Show 1 slide on mobile
        loop: false, // Disable loop
        initialSlide: 0, // Start with the first slide (Google Cloud) in center
        coverflowEffect: { 
            rotate: 15, 
            stretch: 0, 
            depth: 50, 
            modifier: 1, 
            slideShadows: true, 
        },
        navigation: { 
            nextEl: ".swiper-button-next", 
            prevEl: ".swiper-button-prev", 
        },
        breakpoints: {
            // when window width is >= 600px
            600: {
                slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
            }
        },
        on: {
            init: function () {
                // Ensure Google Cloud certification is centered on initialization
                setTimeout(() => {
                    this.slideTo(0, 0);
                }, 100);
            }
        }
    });

    // --- Mobile Certifications Deck of Cards ---
    const mobileCertDeck = document.querySelector('.mobile-cert-deck');
    if (mobileCertDeck) {
        const certCards = document.querySelectorAll('.cert-card');
        const dots = document.querySelectorAll('.mobile-cert-dots .dot');
        let currentIndex = 0;
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        function updateCards() {
            certCards.forEach((card, index) => {
                card.classList.remove('active', 'prev', 'next');
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === (currentIndex - 1 + certCards.length) % certCards.length) {
                    card.classList.add('prev');
                } else if (index === (currentIndex + 1) % certCards.length) {
                    card.classList.add('next');
                }
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextCard() {
            currentIndex = (currentIndex + 1) % certCards.length;
            updateCards();
        }

        function prevCard() {
            currentIndex = (currentIndex - 1 + certCards.length) % certCards.length;
            updateCards();
        }

        // Touch events for swipe
        const deckContainer = document.querySelector('.cert-deck-container');
        
        deckContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        });

        deckContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        deckContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextCard();
                } else {
                    prevCard();
                }
            }
            
            isDragging = false;
        });

        // Click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCards();
            });
        });

        // Initialize
        updateCards();
    }

    // --- BLOG INTERACTIVITY LOGIC ---
    const blogPosts = [
        {
            id: 'post1',
            category: 'Workshop',
            title: 'RGUKT Srikakulam + Google Cloud ML Workshop',
            excerpt: 'An inspiring 2-day workshop at RGUKT Srikakulam where bright students dived deep into Google Cloud\'s Machine Learning APIs. Witnessing their engagement and rapid grasp of complex concepts reaffirmed the immense potential of the next generation of tech innovators.',
            image: 'resources/images/blog-featured-datasci.jpg',
            date: '5 months ago',
            link: 'https://www.linkedin.com/posts/revanthrampal_googlecloud-machinelearning-ai-activity-7315961747343908865-lrW_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB9J5McBcOgXoLlS60qUUD_Q_hts83KtWS8'
        },
        {
            id: 'post2',
            category: 'Community',
            title: 'Global Fabric Day 2025 - Bengaluru Experience',
            excerpt: 'A phenomenal experience at Global Fabric Day 2025 in Bengaluru! Attended one of the most vibrant data community events with hands-on Fabric workshops, live demos, and career-boosting insights. Connected with data enthusiasts and learned from industry experts about Microsoft Fabric, Power BI, and Azure innovations.',
            image: 'resources/images/blog-featured-ml.jpg',
            date: 'May 31, 2025',
            link: 'https://www.linkedin.com/posts/revanthrampal_globalfabricday2025-microsoftfabric-hdac-activity-7335074100928761856-FGaj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB9J5McBcOgXoLlS60qUUD_Q_hts83KtWS8'
        },
        {
            id: 'post3',
            category: 'Workshop',
            title: 'Abhiyanth - IIIT RK Valley 2K25 Workshop',
            excerpt: 'Returning to our alma mater to conduct a workshop was truly special! Led a hands-on workshop at Abhiyanth Tech Fest covering Google Cloud technologies, Document AI, and Cloud Storage. Students gained practical experience and earned Google Cloud badges.',
            image: 'resources/images/blog-featured-tech.jpg',
            date: '6 months ago',
            link: 'https://www.linkedin.com/posts/revanthrampal_pragyashal-googlecloud-artificialintelligence-activity-7302250133482524672-0uEf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB9J5McBcOgXoLlS60qUUD_Q_hts83KtWS8'
        },
        {
            id: 'post4',
            category: 'Research',
            title: 'α-Asynchronous Cellular Automata Convergence Study',
            excerpt: 'This work explores α-asynchronous cellular automata (CA) to understand how systems converge under different conditions. By experimenting with 88 unique elementary CA rules across α values from 0.1 to 1.0, the study identifies 47 rules that consistently converge to fixed configurations.',
            image: 'resources/images/Research_Paper.png',
            date: 'August 29, 2022',
            link: 'https://www.cellularautomata.in/SummerSchool/SummerSchool1/IndianSummerSchool2022.pdf#page=10'
        }
    ];

    const featuredImage = document.querySelector('.featured-blog-image');
    const featuredCategory = document.querySelector('.featured-blog-content .blog-category');
    const featuredTitle = document.querySelector('.featured-blog-content .blog-title');
    const featuredExcerpt = document.querySelector('.featured-blog-content .blog-excerpt');
    const featuredDate = document.querySelector('.featured-blog-content .blog-footer span');
    const featuredLink = document.querySelector('.featured-blog-content .read-more-link');
    const thumbnailItems = document.querySelectorAll('.blog-thumbnail-item');

    function updateFeaturedPost(post) {
        if (!post) return;
        featuredImage.src = post.image;
        featuredImage.alt = post.title;
        featuredCategory.textContent = post.category;
        featuredTitle.textContent = post.title;
        featuredExcerpt.textContent = post.excerpt;
        featuredDate.textContent = post.date;
        featuredLink.href = post.link;
    }

    thumbnailItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = item.dataset.postId;
            let postData;
            
            switch(postId) {
                case 'post1': postData = blogPosts[0]; break;
                case 'post2': postData = blogPosts[1]; break;
                case 'post3': postData = blogPosts[2]; break;
                case 'post4': postData = blogPosts[3]; break;
                default: return;
            }
            
            if (postData) {
                updateFeaturedPost(postData);
                thumbnailItems.forEach(thumb => thumb.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // --- Contact Form Integration with Google Apps Script ---
    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        fetch("https://script.google.com/macros/s/AKfycby5P6UKMAVq2qdei5NgngBF4AZBCQULhuFQqh0ROLOp6GuXEMLVOWtutQS1KnV-3rHagA/exec", {
            method: "POST",
            mode: "no-cors", // Add this to handle CORS issues
            body: JSON.stringify({
                name: e.target.name.value,
                email: e.target.email.value,
                subject: e.target.subject.value,
                message: e.target.message.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            // Since we're using no-cors, we can't read the response
            // But if we get here, the request was sent
            showMessageBox('Message sent successfully!');
            e.target.reset(); // Clear the form
        })
        .catch(err => {
            console.error('Form submission error:', err);
            showMessageBox('Error sending message! Please try again or contact me directly.', true);
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    // --- Gallery Modal Functionality ---
    const galleryImages = [
        'resources/sufista/sufista-1.jpg',
        'resources/sufista/sufista-2.jpg',
        'resources/sufista/sufista-3.jpg',
        'resources/sufista/sufista-4.jpg',
        'resources/sufista/sufista-5.png'
    ];
    
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryImageCounter = document.getElementById('gallery-image-counter');
    const viewAllBtn = document.getElementById('view-all-works-btn');
    const galleryCloseBtn = document.getElementById('gallery-modal-close');
    const galleryPrevBtn = document.getElementById('gallery-prev');
    const galleryNextBtn = document.getElementById('gallery-next');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail-item');
    
    let currentImageIndex = 0;
    
    function openGallery(index = 0) {
        currentImageIndex = index;
        updateGalleryImage();
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeGallery() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    function updateGalleryImage() {
        galleryModalImage.src = galleryImages[currentImageIndex];
        galleryModalImage.alt = `Sufista Design ${currentImageIndex + 1}`;
        galleryImageCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateGalleryImage();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateGalleryImage();
    }
    
    // Event listeners
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => openGallery(0));
    }
    
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', closeGallery);
    }
    
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', showNextImage);
    }
    
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', showPrevImage);
    }
    
    // Click on thumbnails to open gallery
    galleryThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => openGallery(index));
    });
    
    // Close modal when clicking outside the image
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGallery();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
});

// --- Utility Functions ---
function copyCitation() {
    const citationText = 'Maheswar, B. R., & Rampal, R. D. (2022). Understanding the Convergence in Alpha-Asynchronous Cellular Automata. Presented at Ian Summer School on Cellular Automata, RGUKT-AP, RK Valley & IIEST, Shibpur.';
    navigator.clipboard.writeText(citationText).then(() => {
        showMessageBox('Citation copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        showMessageBox('Failed to copy citation.', true);
    });
}

function showMessageBox(message, isError = false) {
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-box-text');
    if (messageBox && messageText) {
        messageText.textContent = message;
        messageBox.style.backgroundColor = isError ? '#dc3545' : '#28a745';
        messageBox.style.display = 'block';
        setTimeout(() => { messageBox.style.display = 'none'; }, 3000);
    }
}
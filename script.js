document.addEventListener('DOMContentLoaded', () => {

    // === 1. PENGAMBILAN ELEMEN DOM ===
    const header = document.querySelector('.main-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    const projectContainer = document.getElementById('project-container');
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const bioTextElement = document.getElementById('bio-text');
    const testimonialsTrack = document.getElementById('testimonials-track');
    
    // === 2. DATA ===
    const projectData = [
        {
            image: 'background-undangan.png',
            title: 'Website Turnamen Agustusan',
            description: 'Engineered a responsive frontend web application to serve as a centralized platform for Minori Group internal tournaments, streamlining the employee invitation and registration process.',
            frontendTech: ['JavaScript', 'HTML', 'CSS'],
            backendTech: [],
            liveDemo: 'https://minorigroupsimfonimerahputih.netlify.app/',
            sourceCode: 'https://github.com/MilkiFauzan/Turnamen-Agustusan'
        },
        {
            image: 'Weatherapp.jpg',
            title: 'Weather App',
            description: 'A simple web application that displays real-time weather data from a public API based on the user-searched location.',
            frontendTech: ['JavaScript', 'HTML', 'CSS', 'API'],
            backendTech: [],
            liveDemo: '#',
            sourceCode: 'https://github.com/MilkiFauzan/Aplikasi-Cuaca'
        },
        {
            image: 'Netflix-clone.jpg',
            title: 'Netflix-clone',
            description: 'Latihan frontend untuk meniru antarmuka pengguna Netflix, fokus pada tata letak CSS Grid & Flexbox.',
            frontendTech: ['HTML', 'CSS Grid', 'Flexbox'],
            backendTech: [],
            liveDemo: 'https://milkinetfliix-clone.netlify.app/',
            sourceCode: 'https://github.com/MilkiFauzan/Netflix-Clone'
        }
    ];

    const biography = `Driven by the challenge of building things that work beautifully—both in code and in human interaction. This passion has led me down the path of Full-Stack Development and mastering the Japanese language (JLPT N3). I thrive in environments where I can apply my technical skills to solve complex problems and my language skills to connect people and ideas.`;

    const testimonialsData = [
        { quote: "Milki is a highly detailed and proactive developer. His code quality is clean and easy to manage.", author: "Budi Santoso", title: "Project Manager" },
        { quote: "Working with Milki was a pleasure. He not only implemented the designs perfectly but also provided valuable feedback to improve the UX.", author: "Citra Lestari", title: "UI/UX Designer" }
    ];

    // === 3. FUNGSI-FUNGSI ===

    const observeCards = () => {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        projectCards.forEach(card => observer.observe(card));
    };
    
    const displayProjects = (projects) => {
        if (!projectContainer) return;
        projectContainer.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="Proyek ${project.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x200/2D3748/f8f9fa?text=Image+Not+Found';">
                <div class="project-card-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="stack-section"><p class="stack-title">Frontend</p><div class="tech-stack">${project.frontendTech.map(tech => `<span>${tech}</span>`).join('')}</div></div>
                    ${project.backendTech && project.backendTech.length > 0 ? `
                        <div class="stack-divider"></div>
                        <div class="stack-section"><p class="stack-title">Backend</p><div class="tech-stack">${project.backendTech.map(tech => `<span>${tech}</span>`).join('')}</div></div>
                    ` : ''}
                    <div class="project-links"><a href="${project.liveDemo}" target="_blank" rel="noopener noreferrer">Live Demo</a><a href="${project.sourceCode}" target="_blank" rel="noopener noreferrer">Lihat Kode</a></div>
                </div>
            </div>
        `).join('');
        observeCards();
    };

    const displayTestimonials = () => {
        if (!testimonialsTrack) return;
        testimonialsTrack.innerHTML = testimonialsData.map(t => `
            <div class="testimonial-card">
                <p class="testimonial-text">"${t.quote}"</p>
                <div class="testimonial-author">${t.author}<span>${t.title}</span></div>
            </div>`).join('');
    };

    const initTestimonialSlider = () => {
        const track = testimonialsTrack;
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (!track || !prevBtn || !nextBtn) return;
        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        let currentIndex = 0;
        const moveToSlide = (targetIndex) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
            currentIndex = targetIndex;
        };
        const updateButtons = () => {
            prevBtn.style.display = (currentIndex === 0) ? 'none' : 'block';
            nextBtn.style.display = (currentIndex === slides.length - 1) ? 'none' : 'block';
        };
        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) { moveToSlide(currentIndex + 1); updateButtons(); }
        });
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { moveToSlide(currentIndex - 1); updateButtons(); }
        });
        window.addEventListener('resize', () => moveToSlide(currentIndex));
        updateButtons();
    };

    // === 4. INISIALISASI & EVENT LISTENERS ===
    
    // Logika Navigasi Mobile (Hamburger)
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Logika Navbar Dinamis (Scroll & Active Link)
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').includes(entry.target.id)) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { threshold: 0.6 });
    sections.forEach(section => sectionObserver.observe(section));

    // Isi Konten Dinamis
    if (bioTextElement) bioTextElement.textContent = biography;
    
    displayTestimonials();
    initTestimonialSlider(); 

    if (filterButtonsContainer) {
        filterButtonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const tech = e.target.getAttribute('data-tech');
                const filteredProjects = tech === 'all' 
                    ? projectData 
                    : projectData.filter(p => (p.frontendTech && p.frontendTech.includes(tech)) || (p.backendTech && p.backendTech.includes(tech)));
                displayProjects(filteredProjects);
            }
        });
    }

    displayProjects(projectData);
});
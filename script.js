// 모바일 메뉴 토글
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// 네비게이션 링크 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 스크롤 애니메이션 - 요소가 뷰포트에 들어올 때 페이드인
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 모든 섹션과 카드에 옵저버 적용
document.querySelectorAll('section, .group').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// 헤더 스크롤 효과
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(245, 245, 244, 0.95)';
        header.style.borderBottomColor = 'rgba(120, 113, 108, 0.2)';
    } else {
        header.style.backgroundColor = '';
    }
});

// 활성 네비게이션 링크 표시
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-amber-700');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-amber-700');
        }
    });
});

// 로드 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// 페이지 로드 초기화
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
document.body.style.opacity = '1';

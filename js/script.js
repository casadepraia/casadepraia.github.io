// Script para o site Casa da Praia do Meio

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const reservationForm = document.getElementById('reservationForm');
    
    // Função para verificar a posição do scroll e ajustar o cabeçalho
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', checkScroll);
    
    // Verificar scroll ao carregar a página
    checkScroll();
    
    // Toggle do menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Remover classe active de todos os links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });
    
    // Scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .about-image, .gallery-item, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Adicionar classe para animação ao scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Verificar elementos visíveis ao carregar
    
    // Validação e envio do formulário de reserva
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria a lógica para enviar o formulário
            // Por enquanto, apenas mostraremos uma mensagem de sucesso
            
            alert('Sua solicitação de reserva foi enviada com sucesso! Entraremos em contato em breve.');
            reservationForm.reset();
        });
    }
    
    // Galeria de imagens com lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const caption = this.querySelector('.gallery-caption h3').textContent;
            
            // Criar elementos do lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;
            
            const lightboxCaption = document.createElement('p');
            lightboxCaption.textContent = caption;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            // Montar estrutura do lightbox
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            
            // Adicionar ao body
            document.body.appendChild(lightbox);
            
            // Impedir scroll do body
            document.body.style.overflow = 'hidden';
            
            // Função para fechar o lightbox
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
            
            // Eventos para fechar o lightbox
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Fechar com tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });
    
    // Adicionar estilos CSS para o lightbox
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border: 3px solid white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-content p {
            color: white;
            text-align: center;
            margin-top: 10px;
            font-size: 1.2rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .animated {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
});

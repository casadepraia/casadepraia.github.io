// Script para o site Paraíso Casa de Praia

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const reservationForm = document.getElementById('reservationForm');

    // Cabeçalho ao rolar a página
    function checkScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Menu mobile
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Links do menu
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (nav) {
                nav.classList.remove('active');
            }

            if (menuToggle) {
                menuToggle.classList.remove('active');
            }

            navLinks.forEach(function (navLink) {
                navLink.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');

            // Evita erro em links contendo somente #
            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Animações ao rolar
    function animateOnScroll() {
        const elements = document.querySelectorAll(
            '.feature-card, .about-image, .gallery-item, .contact-form, .contact-info'
        );

        elements.forEach(function (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // FORMULÁRIO PARA WHATSAPP
    if (reservationForm) {
        reservationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!reservationForm.checkValidity()) {
                reservationForm.reportValidity();
                return;
            }

            const campoNome = reservationForm.querySelector('#name');
            const campoEmail = reservationForm.querySelector('#email');
            const campoTelefone = reservationForm.querySelector('#phone');
            const campoPeriodo = reservationForm.querySelector('#dates');
            const campoHospedes = reservationForm.querySelector('#guests');
            const campoMensagem = reservationForm.querySelector('#message');

            const nome = campoNome ? campoNome.value.trim() : '';
            const email = campoEmail ? campoEmail.value.trim() : '';
            const telefone = campoTelefone ? campoTelefone.value.trim() : '';
            const periodo = campoPeriodo ? campoPeriodo.value.trim() : '';
            const hospedes = campoHospedes ? campoHospedes.value.trim() : '';
            const mensagem = campoMensagem ? campoMensagem.value.trim() : '';

            // Verificação adicional para impedir envio vazio
            if (!nome || !email || !telefone || !periodo || !hospedes) {
                alert('Preencha todos os campos obrigatórios antes de continuar.');
                return;
            }

            const textoWhatsApp = [
                '🏖️ *NOVA SOLICITAÇÃO DE RESERVA*',
                '',
                'Olá, Fabiano! Gostaria de verificar a disponibilidade da Paraíso Casa de Praia.',
                '',
                `👤 *Nome:* ${nome}`,
                `📧 *E-mail:* ${email}`,
                `📱 *Telefone:* ${telefone}`,
                `📅 *Período:* ${periodo}`,
                `👨‍👩‍👧‍👦 *Hóspedes:* ${hospedes}`,
                `💬 *Mensagem:* ${mensagem || 'Nenhuma observação informada.'}`,
                '',
                'Aguardo seu retorno. Obrigado!'
            ].join('\n');

            const numeroWhatsApp = '5598988379460';

            const urlWhatsApp =
                'https://api.whatsapp.com/send?phone=' +
                numeroWhatsApp +
                '&text=' +
                encodeURIComponent(textoWhatsApp);

            // Não apaga o formulário antes de abrir o WhatsApp
            window.location.assign(urlWhatsApp);
        });
    }

    // Galeria com lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const imagem = this.querySelector('img');
            const titulo = this.querySelector('.gallery-caption h3');

            if (!imagem) {
                return;
            }

            const imgSrc = imagem.getAttribute('src');
            const caption = titulo ? titulo.textContent : '';

            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';

            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';

            const lightboxImg = document.createElement('img');
            lightboxImg.src = imgSrc;
            lightboxImg.alt = caption;

            const lightboxCaption = document.createElement('p');
            lightboxCaption.textContent = caption;

            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';

            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            function closeLightbox() {
                if (lightbox.parentNode) {
                    lightbox.parentNode.removeChild(lightbox);
                }

                document.body.style.overflow = '';
            }

            closeBtn.addEventListener('click', closeLightbox);

            lightbox.addEventListener('click', function (event) {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });

            function closeWithEscape(event) {
                if (event.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', closeWithEscape);
                }
            }

            document.addEventListener('keydown', closeWithEscape);
        });
    });

    // CSS do lightbox
    const style = document.createElement('style');

    style.textContent = `
        .lightbox {
            position: fixed;
            inset: 0;
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

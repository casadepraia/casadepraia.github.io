// Script para lidar com o envio de emails do formulário de reserva

document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dates = document.getElementById('dates').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            
            // Preparar o corpo do email
            const emailBody = `
                Nova solicitação de reserva da Casa da Praia do Meio:
                
                Nome: ${name}
                Email: ${email}
                Telefone: ${phone}
                Período da Estadia: ${dates}
                Número de Hóspedes: ${guests}
                Mensagem: ${message}
                
                Data da solicitação: ${new Date().toLocaleString('pt-BR')}
            `;
            
            // Configurar o serviço de email (usando EmailJS)
            emailjs.init("9dz5watWY7sDvMOxC"); // Substitua com seu User ID do EmailJS
            
            // Parâmetros para o envio do email
            const templateParams = {
                to_email: "fabianopenha@gmail.com",
                from_name: name,
                from_email: email,
                subject: "Nova Reserva - Casa da Praia do Meio ---TESTE",
                message: emailBody,
                // Adicionando campos individuais para garantir que sejam acessíveis no template
                name: name,
                email: email,
                phone: phone,
                dates: dates,
                guests: guests,
                user_message: message
            };
            
            // Enviar o email
            emailjs.send('service_f3j5db6', 'template_f30uopk', templateParams) // Substitua com seus IDs do EmailJS
                .then(function(response) {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    alert('Sua solicitação de reserva foi enviada com sucesso! Entraremos em contato em breve.');
                    reservationForm.reset();
                }, function(error) {
                    console.error('Erro ao enviar email:', error);
                    alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente ou entre em contato diretamente pelo telefone.');
                });
        });
    }
});

// Nota: Para que este código funcione em produção, você precisará:
// 1. Criar uma conta no EmailJS (https://www.emailjs.com/)
// 2. Configurar um serviço de email (Gmail, Outlook, etc.)
// 3. Criar um template de email
// 4. Substituir 'user_id', 'service_id' e 'template_id' pelos seus IDs do EmailJS




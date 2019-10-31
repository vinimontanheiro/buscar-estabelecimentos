
(function(){


    $.material.init();
    $.material.ripples();
    $.material.input();
    $.material.checkbox();
    $.material.radio();

    var signupForm = $("#signup-form");
    var signinForm = $("#signin-form");
    var contactForm = $("#contact-form");
    var isOpen = false;

    if (signupForm) {
        signupForm.validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 8
                },
                passwordConfirm: {
                    required: true,
                    minlength: 6,
                    maxlength: 8,
                    equalTo: "#password"
                }
            },
            messages: {
                name: "Por favor, informe o nome",
                email: "Este endereço de e-mail não é válido",
                password: {
                    required: "Por favor, informe a senha",
                    minlength: "A senha deve conter no mínimo 6 caracteres",
                    maxlenght: "A senha deve conter no máximo 8 caracteres"
                },
                passwordConfirm: {
                    required: "Por favor, confirme seu password",
                    minlength: "A senha deve conter no mínimo 6 caracteres",
                    maxlenght: "A senha deve conter no máximo 8 caracteres",
                    equalTo: "Confirmação de senha inválida"
                }
            },

            submitHandler: function (form) {
                form.submit();
            }
        });
    }

    if (signinForm) {
        signinForm.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 8
                }
            },
            messages: {
                email: "Este endereço de e-mail não é válido",
                password: {
                    required: "Por favor, informe a senha",
                    minlength: "A senha deve conter no mínimo 6 caracteres",
                    maxlenght: "A senha deve conter no máximo 8 caracteres"
                }
            },

            submitHandler: function (form) {
                form.submit();
            }
        });
    }

    if (contactForm) {
        contactForm.validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                message: "required"
            },
            messages: {
                name: "Por favor, informe o nome",
                email: "Este endereço de e-mail não é válido",
                message: "Por favor, informe o conteúdo da mensagem"
            },

            submitHandler: function (form) {
                form.submit();
            }
        });
    }

    $('.fa-close').css({'cursor': 'pointer'}).click(function () {
        $('.message-success').remove();
    });

    
})();


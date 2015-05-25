$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#candidate-register-form").fadeOut(100);
        $("#company-register-form").fadeOut(100);
        $('#candidate-register-form-link').removeClass('active');
        $('#company-register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#candidate-register-form-link').click(function(e) {
        $("#candidate-register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#company-register-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $('#company-register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#company-register-form-link').click(function(e) {
        $("#company-register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#candidate-register-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $('#candidate-register-form-link').removeClass('active');

        $(this).addClass('active');
        e.preventDefault();
    });

});
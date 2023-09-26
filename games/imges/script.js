document.addEventListener('DOMContentLoaded', function () {
    const mobileImage = document.getElementById('mobile-image');
    const responsiveImage = document.getElementById('responsive-image');
    const toggleButton = document.getElementById('toggle-button');

    toggleButton.addEventListener('click', function () {
        if (mobileImage.style.display === 'none') {
            mobileImage.style.display = 'block';
            responsiveImage.style.display = 'none';
        } else {
            mobileImage.style.display = 'none';
            responsiveImage.style.display = 'block';
        }
    });
});

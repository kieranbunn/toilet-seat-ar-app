document.getElementById('launch-ar').addEventListener('click', () => {
    document.getElementById('ar-container').style.display = 'block';

    const scene = document.querySelector('a-scene');
    const marker = document.querySelector('a-marker');

    let points = [];
    let currentStep = 'length'; 

    function measureLength() {
        if (points.length === 2) {
            const distance = points[0].distanceTo(points[1]) * 1000; 
            console.log('Length:', distance, 'mm');
            points = [];
            currentStep = 'width';
        }
    }

    function measureWidth() {
        if (points.length === 2) {
            const distance = points[0].distanceTo(points[1]) * 1000;
            console.log('Width:', distance, 'mm');
            points = [];
            currentStep = 'fixingHoles';
        }
    }

    function measureFixingHoles() {
        if (points.length === 2) {
            const distance = points[0].distanceTo(points[1]) * 1000; 
            console.log('Fixing Holes Distance:', distance, 'mm');
            points = [];
            currentStep = 'completed';
            alert('Measurements completed!');
        }
    }

    function addPoint(position) {
        points.push(new THREE.Vector3(position.x, position.y, position.z));
        console.log('Point added:', position);
        if (points.length === 2) {
            if (currentStep === 'length') {
                measureLength();
            } else if (currentStep === 'width') {
                measureWidth();
            } else if (currentStep === 'fixingHoles') {
                measureFixingHoles();
            }
        }
    }

    marker.addEventListener('click', (event) => {
        console.log('Marker clicked');
        const intersectedElement = event.detail.intersectedEl;
        if (intersectedElement) {
            const position = intersectedElement.object3D.position;
            addPoint(position);
        } else {
            console.log('No intersected element');
        }
    });
});

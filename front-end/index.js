// function to make data in box 
function fetchDataAndDisplay() {
    fetch('localhost:3100/dipasena/latest')
        .then(response => response.json())
        .then(data => {
            const time = data.result[0].time;
            const suhu_ruang = data.result[0].suhu_ruang;
            const salinitas = data.result[0].salinitas;
            const oxygen = data.result[0].oxygen.toFixed(2);
            const amonia = data.result[0].amonia.toFixed(5);
            const tinggi = data.result[0].tinggi_air;
            document.getElementById('time').innerHTML = time;
            document.getElementById('suhu_ruang').innerHTML = suhu_ruang;
            document.getElementById('oxygen').innerHTML = oxygen;
            document.getElementById('salinitas').innerHTML = salinitas;
            document.getElementById('amonia').innerHTML = amonia;
            document.getElementById('tinggi_air').innerHTML = tinggi;
        })
        .catch(error =>
            console.error('ada error:', error)
        );
}
// Fungsi ini akan dijalankan setiap satu detik
setInterval(fetchDataAndDisplay, 6000);
// Panggil fungsi ini saat halaman pertama kali dimuat untuk menampilkan data awal
fetchDataAndDisplay();

// TO MAKE TABEL 
function fetchData() {
    fetch('localhost:3100/dipasena/tabel')
        .then(response => response.json())
        .then(data => {
            const dataBody = document.getElementById('data-body');
            dataBody.innerHTML = ''; // Bersihkan isi tbody sebelum menambahkan data baru

            data.result.slice(0,10).forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.time}</td>
                    <td>${item.suhu_air_permukaan}</td>
                    <td>${item.suhu_air_dasar}</td>
                    <td>${item.suhu_ruang}</td>
                    <td>${item.salinitas}</td>
                    <td>${item.oxygen.toFixed(2)}</td>
                    <td>${item.ph}</td>
                    <td>${item.amonia.toFixed(5)}</td>
                    <td>${item.tinggi_air}</td>
                `;

                dataBody.appendChild(row);
            });
        })
        .catch(error =>
            console.error('Ada error:', error)
        );
}
// Panggil fetchData untuk pertama kali
setInterval(fetchData, 6000);
fetchData();

// LINE Chart Suhu AIr 
fetch('localhost:3100/dipasena/suhuAir')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time1).reverse();
    const suhuAirPermukaan = latestData.map(item => item.suhu_air_permukaan).reverse();
    const suhuAirDasar = latestData.map(item => item.suhu_air_dasar).reverse();

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Suhu Air Permukaan',
                data: suhuAirPermukaan,
                borderColor: '#35A29F',
                tension: 0.1
            }]
        }
    });
})

.catch(error => console.error('Error:', error));

fetch('localhost:3100/dipasena/suhuAir')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time1).reverse();
    const suhuAirDasar = latestData.map(item => item.suhu_air_dasar).reverse();

    const grafDasar = document.getElementById('ChartSuhuDasar').getContext('2d');
    new Chart(grafDasar, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Suhu Air Dasar',
                data: suhuAirDasar,
                borderColor: '#071952',
                tension: 0.1
            }]
        }
    });
})  
.catch(error => console.error('Error:', error));


// Line Chart PH 
fetch('localhost:3100/dipasena/ph')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time2).reverse();
    const ph = latestData.map(item => item.ph).reverse();

    const grafPh = document.getElementById('ChartPh').getContext('2d');
    new Chart(grafPh, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'pH Air ',
                data: ph,
                borderColor: '#1A5D1A',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart KADAR OKSIGEN
fetch('localhost:3100/dipasena/chart/do')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 60 data terbaru

    const labels = latestData.map(item => item.time3).reverse();
    const Oksigen = latestData.map(item => item.oxygen).reverse();

    const grafDo = document.getElementById('ChartDo').getContext('2d');
    new Chart(grafDo, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'DO ',
                data: Oksigen,
                borderColor: '#E55604',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));



// Line Chart SALINITAS
fetch('localhost:3100/dipasena/chart/salinitas')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time4).reverse();
    const salinitas = latestData.map(item => item.salinitas).reverse();

    const grafSalinitas = document.getElementById('ChartSalinitas').getContext('2d');
    new Chart(grafSalinitas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'TDS Air ',
                data: salinitas,
                borderColor: '#16FF00',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart Suhu Ruang
fetch('localhost:3100/dipasena/chart/suhuRuang')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time5).reverse();
    const suhuRuang = latestData.map(item => item.suhu_ruang).reverse();

    const grafSuhuRuang = document.getElementById('ChartSuhuRuang').getContext('2d');
    new Chart(grafSuhuRuang, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Suhu Ruang ',
                data: suhuRuang,
                borderColor: '#FFED00',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart Amonia
fetch('localhost:3100/dipasena/chart/amonia')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time6).reverse();
    const amonia_ = latestData.map(item => item.amonia.toFixed(5)).reverse();

    const grafAmonia = document.getElementById('ChartAmonia').getContext('2d');
    new Chart(grafAmonia, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amonia ',
                data: amonia_,
                borderColor: '#C21010',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// Line Chart Tinggi Air Tambak
fetch('localhost:3100/dipasena/chart/tinggiAir')
.then(response => response.json())
.then(data => {
    const result = data.result;
    const latestData = result.slice(Math.max(result.length - 60, 0)); // Ambil 20 data terbaru

    const labels = latestData.map(item => item.time7).reverse();
    const tinggi = latestData.map(item => item.tinggi_air).reverse();

    const grafTinggi = document.getElementById('ChartTinggiAir').getContext('2d');
    new Chart(grafTinggi, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ketinggian air',
                data: tinggi,
                borderColor: '#EA1179',
                tension: 0.1
            }]
        }
    });
})
.catch(error => console.error('Error:', error));

// 
// Ambil elemen p dengan id 'phBox'
var phBox = document.getElementById('phBox');
// Fungsi untuk mengubah warna kotak dan teks berdasarkan nilai pH
function updatePhBox(phValue) {
    if (phValue < 5 || phValue > 9) {
        phBox.parentElement.style.backgroundColor = '#FF0303';
        phBox.innerHTML = phValue.toFixed(2);
    } else {
        phBox.parentElement.style.backgroundColor = '#16FF00';
        phBox.innerHTML = phValue.toFixed(2);
    }
}

// Mengambil data dari API setiap menit
fetch(`localhost:3100/dipasena/ph`)
    .then(response => response.json())
    .then(data => {
        // Ambil nilai pH terakhir dari data
        var lastPhValue = data.result[0].ph;

        // Ubah warna kotak dan teks berdasarkan nilai pH
        updatePhBox(lastPhValue);
        // updatePhBox(lastSuhuPerValue);
    })
    .catch(error => console.error('Error:', error));

// To Make box green or red if suhu air value <23 >39
var permukaanBox = document.getElementById('permukaanBox');
var dasarBox = document.getElementById('dasarBox');
// Fungsi untuk mengubah warna kotak dan teks berdasarkan nilai suhu_air_dasar
function updatepermukaanBox(suhu_air_permukaanValue) {
    if (suhu_air_permukaanValue < 23 || suhu_air_permukaanValue > 39) {
        permukaanBox.parentElement.style.backgroundColor = '#FF0303';
        permukaanBox.innerHTML = suhu_air_permukaanValue.toFixed(2);
    } else {
        permukaanBox.parentElement.style.backgroundColor = '#16FF00';
        permukaanBox.innerHTML = suhu_air_permukaanValue.toFixed(2);
    }
}
function updatedasarBox(suhu_air_dasarValue) {
    if (suhu_air_dasarValue < 23 || suhu_air_dasarValue > 39) {
        dasarBox.parentElement.style.backgroundColor = '#FF0303';
        dasarBox.innerHTML = suhu_air_dasarValue.toFixed(2);
    } else {
        dasarBox.parentElement.style.backgroundColor = '#16FF00';
        dasarBox.innerHTML = suhu_air_dasarValue.toFixed(2);
    }
}
// Mengambil data dari API
fetch(`localhost:3100/dipasena/suhuAir`)
    .then(response => response.json())
    .then(data => {
        // Ambil nilai suhu_air_dasar terakhir dari data
        var lastSuhuPermukaanValue = data.result[0].suhu_air_permukaan;
        var lastSuhuDasarValue = data.result[0].suhu_air_dasar;
        // Ubah warna kotak dan teks berdasarkan nilai suhu_air_dasar
        updatepermukaanBox(lastSuhuPermukaanValue);
        updatedasarBox(lastSuhuDasarValue);
    })
    .catch(error => console.error('Error:', error));



// take fluctuation ph value from API 
var fluxPhBox = document.getElementById('phFluxBox');
// Fungsi untuk mengubah warna kotak dan teks berdasarkan nilai pH
function updateFluxPhBox(fluctuationValue) {
    if (fluctuationValue < 0.2 || fluctuationValue > 1.2) {
        fluxPhBox.parentElement.style.backgroundColor = '#FF0303';
        fluxPhBox.innerHTML = fluctuationValue.toFixed(2);
    } else {
        fluxPhBox.parentElement.style.backgroundColor = '#16FF00';
        fluxPhBox.innerHTML = fluctuationValue.toFixed(2);
    }
}
// Mengambil data dari API 
fetch(`localhost:3100/dipasena/fluxPh`)
    .then(response => response.json())
    .then(data => {
        // Ambil nilai pH terakhir dari data
        var lastFluxPhValue = data.fluctuation;
        // Ubah warna kotak dan teks berdasarkan nilai pH
        updateFluxPhBox(lastFluxPhValue);
        // updatePhBox(lastSuhuPerValue);
    })
    .catch(error => console.error('Error:', error));

// 
var fluxSuhuDasarBox = document.getElementById('dasarFluxBox');
var fluxSuhuPermukaanBox = document.getElementById('permukaanFluxBox');
var fluxSuhuRataBox = document.getElementById('rataFluxBox');
// Fungsi untuk mengubah warna kotak dan teks berdasarkan nilai pH
function updateFluxDasarBox(fluctuationDasarValue) {
    if (fluctuationDasarValue > 3) {
        fluxSuhuDasarBox.parentElement.style.backgroundColor = '#FF0303';
        fluxSuhuDasarBox.innerHTML = fluctuationDasarValue.toFixed(2);
    } else {
        fluxSuhuDasarBox.parentElement.style.backgroundColor = '#16FF00';
        fluxSuhuDasarBox.innerHTML = fluctuationDasarValue.toFixed(2);
    }
}
function updateFluxPermukaanBox(fluctuationPermukaanValue) {
    if (fluctuationPermukaanValue > 3) {
        fluxSuhuPermukaanBox.parentElement.style.backgroundColor = '#FF0303';
        fluxSuhuPermukaanBox.innerHTML = fluctuationPermukaanValue.toFixed(2);
    } else {
        fluxSuhuPermukaanBox.parentElement.style.backgroundColor = '#16FF00';
        fluxSuhuPermukaanBox.innerHTML = fluctuationPermukaanValue.toFixed(2);
    }
}
function updateFluxRataBox(fluctuationSuhuRataRataValue) {
    if (fluctuationSuhuRataRataValue > 3) {
        fluxSuhuRataBox.parentElement.style.backgroundColor = '#FF0303';
        fluxSuhuRataBox.innerHTML = fluctuationSuhuRataRataValue.toFixed(2);
    } else {
        fluxSuhuRataBox.parentElement.style.backgroundColor = '#16FF00';
        fluxSuhuRataBox.innerHTML = fluctuationSuhuRataRataValue.toFixed(2);
    }
}
// Mengambil data dari API 
fetch(`localhost:3100/dipasena/fluxSuhuAir`)
    .then(response => response.json())
    .then(data => {
        // Ambil nilai pH terakhir dari data
        var lastDasarValue = data.fluctuationDasar;
        var lastPermukaanValue = data.fluctuationPermukaan;
        var lastRataValue = data.fluctuationSuhuRataRata;
        // Ubah warna kotak dan teks berdasarkan nilai pH
        updateFluxDasarBox(lastDasarValue);
        updateFluxPermukaanBox(lastPermukaanValue);
        updateFluxRataBox(lastRataValue)
    })
    .catch(error => console.error('Error:', error));
 

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = sidebar.style.left === '-200px' ? '0' : '-200px';
}

const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.2088, lng: 106.8456 }, // Koordinat yang diinginkan
    zoom: 12,
    width: 400,
    height: 300,
});


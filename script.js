// Database sederhana di browser
let dataPiket = JSON.parse(localStorage.getItem('piketDB')) || [];

function switchRole(role) {
    document.getElementById('admin-panel').classList.toggle('hidden', role !== 'admin');
    document.getElementById('siswa-panel').classList.toggle('hidden', role !== 'siswa');
    document.getElementById('btn-admin').classList.toggle('active', role === 'admin');
    document.getElementById('btn-siswa').classList.toggle('active', role === 'siswa');
    
    if(role === 'siswa') tampilkanJadwalSiswa();
}

// Fungsi untuk memunculkan notifikasi custom
function showNotif(pesan, ikon = "✨") {
    const modal = document.getElementById('custom-alert');
    document.getElementById('modal-message').innerText = pesan;
    document.getElementById('modal-icon').innerText = ikon;
    modal.classList.remove('hidden');
}

function closeModal() {
    console.log("Tombol close diklik!"); // Cek di F12 (Console) apakah ini muncul
    const modal = document.getElementById('custom-alert');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showNotif(pesan, ikon = "✨") {
    const modal = document.getElementById('custom-alert');
    const msg = document.getElementById('modal-message');
    const ico = document.getElementById('modal-icon');

    if(modal && msg && ico) {
        msg.innerText = pesan;
        ico.innerText = ikon;
        modal.classList.remove('hidden');
    }
}

// Update fungsi tambahJadwal agar pakai notif baru
function tambahJadwal() {
    const nama = document.getElementById('nama-siswa').value;
    const hari = document.getElementById('hari-piket').value;

    if(nama) {
        dataPiket.push({ nama, hari });
        localStorage.setItem('piketDB', JSON.stringify(dataPiket));
        
        // Panggil notifikasi gemoy
        showNotif("Yey! Jadwal " + nama + " berhasil disimpan!", "💖");
        
        document.getElementById('nama-siswa').value = "";
    } else {
        showNotif("Ups! Namanya diisi dulu ya cantik/ganteng..", "🌸");
    }
}

function tampilkanJadwalSiswa() {
    const list = document.getElementById('daftar-piket-hari-ini');
    const notif = document.getElementById('notif-area');
    
    // Simulasi hari ini (bisa diganti dengan new Date().getDay())
    const hariHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const hariIni = hariHari[new Date().getDay()];

    const petugasHariIni = dataPiket.filter(item => item.hari === hariIni);

    if (petugasHariIni.length > 0) {
        notif.innerHTML = `🔔 <b>Reminder:</b> Kamu ada jadwal piket hari ini!`;
        list.innerHTML = petugasHariIni.map(p => `<li>✨ ${p.nama}</li>`).join('');
    } else {
        notif.innerHTML = `✅ Tidak ada jadwal tugas piket untuk hari ini.`;
        list.innerHTML = "";
    }
}
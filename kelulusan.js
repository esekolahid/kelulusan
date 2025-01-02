    <footer>
      Hak Cipta &copy; 2025 - <a href="https://www.esekolah.id" target="_blank">ESEKOLAH.ID</a><br>
      Solusi Digital Terbaik untuk Sekolah Anda
    </footer>
    <script>
      let targetDate;
      const countdownDiv = document.getElementById('countdown');
      const loginForm = document.getElementById('login-form');
      const resultDiv = document.getElementById('result');

      const motivasi = [
        "Langkah kecil hari ini adalah awal dari impian besar di masa depan.",
        "Gagal itu belajar, bangkit itu keberanian.",
        "Jangan takut mencoba, karena dari sanalah kamu tumbuh.",
        "Kesuksesan butuh usaha, bukan hanya mimpi.",
        "Terus belajar, dunia ini luas untuk dijelajahi.",
        "Percaya pada dirimu, kamu lebih kuat dari yang kamu kira.",
        "Masa depan cerah menanti, teruslah melangkah.",
        "Lakukan yang terbaik, hasil akan mengikuti.",
        "Keberanianmu adalah kunci untuk membuka pintu peluang.",
        "Jadilah versi terbaik dari dirimu setiap hari.",
        "Setiap akhir adalah awal yang baru.",
        "Semangatmu adalah api yang akan menerangi jalanmu.",
        "Impianmu layak diperjuangkan, jangan pernah menyerah.",
        "Hari ini adalah kesempatan untuk memulai sesuatu yang luar biasa.",
        "Belajarlah dari kemarin, hidup untuk hari ini, dan berharap untuk esok.",
        "Setiap perjalanan dimulai dengan satu langkah pertama.",
        "Keyakinanmu adalah fondasi dari kesuksesanmu.",
        "Jangan biarkan rasa takut menghentikan langkahmu.",
        "Selalu ada pelangi setelah badai.",
        "Usaha keras tak pernah mengkhianati hasil.",
        "Berani bermimpi besar, berani bekerja keras.",
        "Hidup adalah tentang terus mencoba.",
        "Setiap hari adalah peluang untuk menjadi lebih baik.",
        "Keajaiban terjadi pada mereka yang percaya.",
        "Jangan bandingkan dirimu dengan orang lain, fokus pada perjalananmu sendiri.",
        "Kerja keras sekarang, panen kesuksesan nanti.",
        "Raihlah mimpi dengan hati dan pikiran yang kuat.",
        "Setiap hambatan adalah peluang untuk tumbuh.",
        "Bangga pada dirimu adalah langkah pertama menuju sukses.",
        "Jadilah inspirasi bagi dirimu sendiri dan orang lain."
      ];

      let currentMotivasiIndex = 0;

      function updateMotivasi() {
        document.getElementById("motivasi").textContent = motivasi[currentMotivasiIndex];
        currentMotivasiIndex = (currentMotivasiIndex + 1) % motivasi.length;
      }

      setInterval(updateMotivasi, 2000);

      google.script.run.withSuccessHandler(response => {
        targetDate = new Date(response.targetDate);
        setInterval(updateCountdown, 1000);
      }).getCountdownTime();

      function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
          countdownDiv.innerHTML = "<h2>Pengumuman Sudah Dibuka!</h2>";
          loginForm.style.display = "block";
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
      }

      function submitLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        google.script.run.withSuccessHandler(response => {
          if (response.error) {
            alert(response.error);
            return;
          }

          loginForm.style.display = "none";
          resultDiv.style.display = "block";
          resultDiv.innerHTML = ` 
            <p><strong>Nama:</strong> ${response.nama}</p>
            <p><strong>NISN:</strong> ${response.nisn}</p>
            <p><strong>Kelas:</strong> ${response.kelas}</p>
            <p><strong>TTL:</strong> ${response.ttl}</p>
            <p><strong>Orang Tua:</strong> ${response.ortu}</p>
            <p><strong>Keterangan:</strong> ${response.keterangan}</p>
            <a href="${response.linkskl}" class="btn" target="_blank">Unduh SKL</a>
          `;
        }).validateUser(username, password);
      }
    </script>
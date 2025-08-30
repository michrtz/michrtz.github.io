(() => {
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const grid = document.getElementById('grid');
  const dots = document.getElementById('dots');
  const g = grid.getContext('2d');
  const d = dots.getContext('2d');

  let W=0, H=0, running=true;
  const cfg = { 
    grid: { step: 32, color: 'rgba(255,255,255,0.04)' },
    dots: { count: 60 }
  };

  function resize() {
    W = grid.clientWidth;
    H = grid.clientHeight;
    for (const cv of [grid, dots]) {
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
    }
    drawGrid();
  }

  function drawGrid() {
    g.clearRect(0,0,grid.width,grid.height);
    g.save(); g.scale(DPR,DPR);
    const step = cfg.grid.step;
    g.strokeStyle = cfg.grid.color;
    for (let x=0; x<W; x+=step) {
      g.beginPath(); g.moveTo(x,0); g.lineTo(x,H); g.stroke();
    }
    for (let y=0; y<H; y+=step) {
      g.beginPath(); g.moveTo(0,y); g.lineTo(W,y); g.stroke();
    }
    g.restore();
  }

  const particles = [];
  function spawn() {
    particles.length = 0;
    for (let i=0; i<cfg.dots.count; i++) {
      particles.push({x:Math.random()*W, y:Math.random()*H, r:1+Math.random()*2});
    }
  }

  function tick() {
    if (!running) return;
    d.clearRect(0,0,dots.width,dots.height);
    d.save(); d.scale(DPR,DPR);
    d.fillStyle="white";
    for (const p of particles) {
      d.beginPath();
      d.arc(p.x,p.y,p.r,0,Math.PI*2);
      d.fill();
      p.y += 0.2; if (p.y>H) p.y=0;
    }
    d.restore();
    requestAnimationFrame(tick);
  }

  resize();
  spawn();
  tick();
  window.addEventListener('resize', () => { resize(); spawn(); });
})();

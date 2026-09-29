const { useState, useEffect, useRef } = React;

const WA = '573123868968';
const waLink = (t = 'Hola, quiero pedir el extensor de toma corriente plano giratorio') =>
  `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M12 2.5a9.500 9.500 0 0 0-8.100 14.400L2.500 21.500l4.700-1.300A9.500 9.500 0 1 0 12 2.500z"/>
    <path fill="currentColor" stroke="none" d="M16.600 14.200c-.2-.1-1.400-.7-1.600-.8-.2-.1-.4-.1-.5.100l-.7.900c-.1.200-.3.200-.5.100-1.400-.7-2.300-1.200-3.200-2.700-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.100-.7.300-.2.300-.9.900-.9 2.200s.9 2.600 1.100 2.800c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.200.6 3 .6.500-.1 1.400-.6 1.600-1.200.2-.6.2-1.100.1-1.200 0-.1-.2-.2-.5-.3z"/>
  </svg>
);

function Cta({ label = 'Pedir ya', big }) {
  return (
    <a className={'cta' + (big ? ' cta-big' : '')} href={waLink()} target="_blank" rel="noopener">
      <span>{label}</span><WaIcon />
    </a>
  );
}

function Cuboid({ w, h, d, cls = '', children }) {
  const f = (t) => ({ width: w, height: h, ...t });
  return (
    <div className={'cub ' + cls} style={{ width: w, height: h }}>
      <div className="face front" style={f({ transform: `translateZ(${d / 2}px)` })}>{children}</div>
      <div className="face back" style={f({ transform: `rotateY(180deg) translateZ(${d / 2}px)` })} />
      <div className="face side" style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
      <div className="face side" style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
      <div className="face cap" style={{ width: w, height: d, top: (h - d) / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)` }} />
      <div className="face cap" style={{ width: w, height: d, top: (h - d) / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)` }} />
    </div>
  );
}

function Model3D() {
  const stage = useRef(null);
  const [angle, setAngle] = useState(0);
  useEffect(() => Scene3D.attach(stage.current), []);
  return (
    <div className="model-wrap">
      <div className="stage" ref={stage} aria-label="Modelo 3D del extensor, arrastra para girarlo">
        <div className="rig">
          <div className="head-pivot" style={{ transform: `translateY(-150px) rotateZ(${angle}deg)` }}>
            <Cuboid w={104} h={150} d={44} cls="head">
              <div className="outlet o1"><i /><i /></div>
              <div className="outlet o2"><i /><i /></div>
              <div className="usb" />
            </Cuboid>
          </div>
          <div className="strip"><Cuboid w={40} h={250} d={8} cls="band" /></div>
          <div className="plug">
            {[0, 6, 12, 18].map(z => <b key={z} style={{ transform: `translateZ(${z - 9}px)` }} />)}
            <em /><em />
          </div>
        </div>
        <div className="glow" />
      </div>
      <label className="angle">
      </label>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero">
      <nav className="nav">
        <strong>ExtiPlano</strong>
        <Cta label="Pedir ya" />
      </nav>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1>El enchufe está detrás del sofá.<br />Tú estás en la cama.</h1>
          <p>Un extensor plano que sube por la pared, gira 180° y deja la toma justo donde la necesitas. Sin cables cruzando el cuarto.</p>
          <div className="hero-actions">
            <Cta big />
            <span className="hint">Respondemos por WhatsApp</span>
          </div>
        </div>
        <Model3D />
      </div>
    </header>
  );
}

function Problem() {
  const items = [
    ['Cargas el celular en el piso', 'Porque la única toma libre está junto al zócalo.'],
    ['El cable cruza el cuarto', 'Y alguien siempre termina tropezando con él.'],
    ['Los muebles tapan las tomas', 'Mover el sofá cada vez que enchufas algo no es plan.'],
  ];
  return (
    <section className="problem">
      <h2>Tu casa no se diseñó para tus aparatos.</h2>
      <ul>{items.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ul>
    </section>
  );
}

function Showcase() {
  return (
    <section className="show">
      <div className="show-img">
        <img src="img/producto.png" alt="Extensor plano giratorio: vistas del enchufe, la cinta y las tomas" loading="lazy" />
      </div>
      <div className="show-copy">
        <h2>Delgado como una cinta. Firme como una toma de pared.</h2>
        <ul className="feats">
          <li><b>Cinta plana</b> que se pega a la pared o pasa bajo muebles.</li>
          <li><b>Enchufe giratorio</b> para adaptarse a cualquier esquina.</li>
          <li><b>Varias tomas</b> y espacio para dejar el celular cargando.</li>
          <li><b>Instalación segundos.</b> Lo conectas y listo.</li>
        </ul>
        <Cta big label="Quiero el mío" />
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="final">
      <h2>Deja de mover muebles para conectar un cargador.</h2>
      <Cta big label="Pedir ya" />
    </section>
  );
}

function App() {
  return (
    <>
      <Hero />
      <Problem />
      <Showcase />
      <Final />
      <footer className="foot">ExtiPlano · Pedidos por WhatsApp 312 386 8968</footer>
      <a className="wa-float" href={waLink()} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp"><WaIcon /></a>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
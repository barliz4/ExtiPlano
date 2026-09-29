const WA = '573123868968';

const waLink = (
  t = 'Hola, quiero pedir el extensor de toma corriente plano giratorio'
) => {
  return `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
};


// =========================
// ICONO DE WHATSAPP
// =========================

function waIcon() {
  return `
    <svg viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linejoin="round">

      <path d="M12 2.5a9.500 9.500 0 0 0-8.100 14.400L2.500 21.500l4.700-1.300A9.500 9.500 0 1 0 12 2.500z"/>

      <path
        fill="currentColor"
        stroke="none"
        d="M16.600 14.200c-.2-.1-1.400-.7-1.600-.8-.2-.1-.4-.1-.5.100l-.7.900c-.1.200-.3.200-.5.100-1.400-.7-2.300-1.200-3.200-2.700-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.100-.7.300-.2.300-.9.900-.9 2.200s.9 2.600 1.100 2.800c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.200.6 3 .6.500-.1 1.400-.6 1.600-1.200.2-.6.2-1.100.1-1.200 0-.1-.2-.2-.5-.3z"
      />
    </svg>
  `;
}


// =========================
// BOTÓN WHATSAPP
// =========================

function cta(label = 'Pedir ya', big = false) {
  return `
    <a
      class="cta${big ? ' cta-big' : ''}"
      href="${waLink()}"
      target="_blank"
      rel="noopener">

      <span>${label}</span>
      ${waIcon()}
    </a>
  `;
}


// =========================
// CUBOID 3D
// =========================

function cuboid(w, h, d, cls = '', children = '') {

  return `
    <div
      class="cub ${cls}"
      style="width:${w}px;height:${h}px">

      <div
        class="face front"
        style="
          width:${w}px;
          height:${h}px;
          transform:translateZ(${d / 2}px)
        ">
        ${children}
      </div>

      <div
        class="face back"
        style="
          width:${w}px;
          height:${h}px;
          transform:rotateY(180deg) translateZ(${d / 2}px)
        ">
      </div>

      <div
        class="face side"
        style="
          width:${d}px;
          height:${h}px;
          left:${(w - d) / 2}px;
          transform:rotateY(90deg) translateZ(${w / 2}px)
        ">
      </div>

      <div
        class="face side"
        style="
          width:${d}px;
          height:${h}px;
          left:${(w - d) / 2}px;
          transform:rotateY(-90deg) translateZ(${w / 2}px)
        ">
      </div>

      <div
        class="face cap"
        style="
          width:${w}px;
          height:${d}px;
          top:${(h - d) / 2}px;
          transform:rotateX(90deg) translateZ(${h / 2}px)
        ">
      </div>

      <div
        class="face cap"
        style="
          width:${w}px;
          height:${d}px;
          top:${(h - d) / 2}px;
          transform:rotateX(-90deg) translateZ(${h / 2}px)
        ">
      </div>

    </div>
  `;
}


// =========================
// MODELO 3D
// =========================

function model3D() {

  const plugs = [0, 6, 12, 18]
    .map(z => `
      <b style="transform:translateZ(${z - 9}px)"></b>
    `)
    .join('');

  return `
    <div class="model-wrap">

      <div
        class="stage"
        id="stage3d"
        aria-label="Modelo 3D del extensor, arrastra para girarlo">

        <div class="rig">

          <div
            class="head-pivot"
            id="headPivot"
            style="transform:translateY(-150px) rotateZ(0deg)">

            ${cuboid(
              104,
              150,
              44,
              'head',
              `
                <div class="outlet o1">
                  <i></i>
                  <i></i>
                </div>

                <div class="outlet o2">
                  <i></i>
                  <i></i>
                </div>

                <div class="usb"></div>
              `
            )}

          </div>

          <div class="strip">

            ${cuboid(
              40,
              250,
              8,
              'band'
            )}

          </div>

          <div class="plug">

            ${plugs}

            <em></em>
            <em></em>

          </div>

        </div>

        <div class="glow"></div>

      </div>

      <label class="angle"></label>

    </div>
  `;
}


// =========================
// HERO
// =========================

function hero() {

  return `
    <header class="hero">

      <nav class="nav">

        <strong>ExtiPlano</strong>

        ${cta('Pedir ya')}

      </nav>

      <div class="hero-grid">

        <div class="hero-copy">

          <h1>
            El enchufe está detrás del sofá.<br>
            Tú estás en la cama.
          </h1>

          <p>
            Un extensor plano que sube por la pared,
            gira 180° y deja la toma justo donde la
            necesitas. Sin cables cruzando el cuarto.
          </p>

          <div class="hero-actions">

            ${cta('Pedir ya', true)}

            <span class="hint">
              Respondemos por WhatsApp
            </span>

          </div>

        </div>

        ${model3D()}

      </div>

    </header>
  `;
}


// =========================
// PROBLEMA
// =========================

function problem() {

  const items = [
    [
      'Cargas el celular en el piso',
      'Porque la única toma libre está junto al zócalo.'
    ],
    [
      'El cable cruza el cuarto',
      'Y alguien siempre termina tropezando con él.'
    ],
    [
      'Los muebles tapan las tomas',
      'Mover el sofá cada vez que enchufas algo no es plan.'
    ]
  ];

  const list = items.map(item => `
    <li>
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
    </li>
  `).join('');

  return `
    <section class="problem">

      <h2>
        Tu casa no se diseñó para tus aparatos.
      </h2>

      <ul>
        ${list}
      </ul>

    </section>
  `;
}


// =========================
// SHOWCASE
// =========================

function showcase() {

  return `
    <section class="show">

      <div class="show-img">

        <img
          src="img/producto.png"
          alt="Extensor plano giratorio: vistas del enchufe, la cinta y las tomas"
          loading="lazy"
        >

      </div>

      <div class="show-copy">

        <h2>
          Delgado como una cinta.
          Firme como una toma de pared.
        </h2>

        <ul class="feats">

          <li>
            <b>Cinta plana</b>
            que se pega a la pared o pasa bajo muebles.
          </li>

          <li>
            <b>Enchufe giratorio</b>
            para adaptarse a cualquier esquina.
          </li>

          <li>
            <b>Varias tomas</b>
            y espacio para dejar el celular cargando.
          </li>

          <li>
            <b>Instalación segundos.</b>
            Lo conectas y listo.
          </li>

        </ul>

        ${cta('Quiero el mío', true)}

      </div>

    </section>
  `;
}


// =========================
// SECCIÓN FINAL
// =========================

function finalSection() {

  return `
    <section class="final">

      <h2>
        Deja de mover muebles para conectar un cargador.
      </h2>

      ${cta('Pedir ya', true)}

    </section>
  `;
}


// =========================
// APLICACIÓN
// =========================

function app() {

  const root = document.getElementById('root');

  root.innerHTML = `
    ${hero()}
    ${problem()}
    ${showcase()}
    ${finalSection()}

    <footer class="foot">
      ExtiPlano · Pedidos por WhatsApp 312 386 8968
    </footer>

    <a
      class="wa-float"
      href="${waLink()}"
      target="_blank"
      rel="noopener"
      aria-label="Escribir por WhatsApp">

      ${waIcon()}

    </a>
  `;

  // Conectar el modelo 3D
  const stage = document.getElementById('stage3d');

  if (
    typeof Scene3D !== 'undefined' &&
    Scene3D.attach &&
    stage
  ) {
    Scene3D.attach(stage);
  }
}


// =========================
// INICIAR
// =========================

document.addEventListener('DOMContentLoaded', app);
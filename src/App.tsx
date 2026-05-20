import { useState } from 'react'

const RESTAURANTES = [
  { nombre: 'El Bodegón NKT', emoji: '🦞', cat: 'Mariscos · Pizzas · Sándwiches' },
  { nombre: "Colantonio's", emoji: '🍕', cat: 'Pizza napolitana · Empanadas' },
  { nombre: 'Kusama Sushi', emoji: '🍣', cat: 'Sushi · Mariscos' },
]

export default function App() {
  const [pantalla, setPantalla] = useState('login')
  const [restSeleccionado, setRestSeleccionado] = useState(0)
  const [tabActiva, setTabActiva] = useState('pedidos')
  const [abierto, setAbierto] = useState(true)
  const rest = RESTAURANTES[restSeleccionado]

  if (pantalla === 'login') return (
    <div style={s.bg}>
      <div style={s.loginCard}>
        <div style={s.loginHero}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26" fill="none" stroke="#FF4D00" strokeWidth="4"
              strokeDasharray="140 24" strokeDashoffset="-4" strokeLinecap="round"/>
            <circle cx="50" cy="13" r="4" fill="#FFD166"/>
            <text x="30" y="38" textAnchor="middle" fontFamily="system-ui"
              fontWeight="700" fontSize="20" letterSpacing="-1" fill="white">ALL</text>
          </svg>
          <div style={s.loginTitle}>App Restaurante</div>
          <div style={s.loginSub}>Ingresá con tu cuenta</div>
        </div>
        <div style={s.loginBody}>
          <div style={s.fieldLabel}>Seleccioná tu restaurante</div>
          {RESTAURANTES.map((r, i) => (
            <div key={i} onClick={() => setRestSeleccionado(i)}
              style={{...s.restOpt, ...(restSeleccionado === i ? s.restOptSel : {})}}>
              <span style={{fontSize:22}}>{r.emoji}</span>
              <div>
                <div style={s.restNombre}>{r.nombre}</div>
                <div style={s.restCat}>{r.cat}</div>
              </div>
              {restSeleccionado === i && <span style={s.check}>✓</span>}
            </div>
          ))}
          <div style={{...s.fieldLabel, marginTop:16}}>Contraseña</div>
          <input type="password" placeholder="••••••••" style={s.input}/>
          <button onClick={() => setPantalla('panel')} style={s.btnMain}>Ingresar →</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={s.bg}>
      <div style={s.phone}>
        <div style={s.topbar}>
          <div>
            <div style={s.topbarName}>{rest.emoji} {rest.nombre}</div>
            <div style={s.topbarSub}>Panel del local</div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:5}}>
            <div style={{width:7, height:7, borderRadius:'50%', background: abierto ? '#2D6A2D' : '#ccc'}}></div>
            <span style={{color: abierto ? '#2D6A2D' : '#ccc', fontSize:11, fontWeight:600}}>
              {abierto ? 'Abierto' : 'Cerrado'}
            </span>
          </div>
        </div>

        <div style={s.tabs}>
          {['pedidos','menu','local'].map(t => (
            <div key={t} onClick={() => setTabActiva(t)}
              style={{...s.tab, ...(tabActiva === t ? s.tabActive : {})}}>
              {t === 'pedidos' ? 'Pedidos' : t === 'menu' ? 'Menú' : 'Mi local'}
            </div>
          ))}
        </div>

        <div style={s.scroll}>
          {tabActiva === 'pedidos' && (
            <div>
              <div style={s.toggleRow}>
                <div>
                  <div style={s.toggleLabel}>Estado del local</div>
                  <div style={s.toggleSub}>{abierto ? 'Recibiendo pedidos' : 'Pausado'}</div>
                </div>
                <div onClick={() => setAbierto(!abierto)}
                  style={{...s.toggleTrack, background: abierto ? '#2D6A2D' : '#ddd'}}>
                  <div style={{...s.toggleThumb, left: abierto ? 21 : 3}}></div>
                </div>
              </div>
              <div style={s.statsRow}>
                <div style={{...s.stat, background:'#FF4D00'}}>
                  <div style={{fontSize:20, fontWeight:700, color:'#fff'}}>3</div>
                  <div style={{fontSize:9, color:'rgba(255,255,255,0.7)', marginTop:2}}>Nuevos</div>
                </div>
                <div style={s.stat}><div style={s.statVal}>12</div><div style={s.statLabel}>Hoy</div></div>
                <div style={s.stat}><div style={s.statVal}>$48k</div><div style={s.statLabel}>Ingresos</div></div>
              </div>
              <div style={s.sectionTitle}>PEDIDOS ACTIVOS</div>
              {[
                {num:'#1047', cliente:'Martín Rodríguez', estado:'NUEVO', hora:'18:52', items:['2× Pizza de mariscos','1× Sándwich de lomo'], total:'$12.400', dir:'San Martín 542'},
                {num:'#1046', cliente:'Laura Gómez', estado:'PREPARANDO', hora:'18:38', items:['1× Cazuela de mariscos'], total:'$9.800', dir:'Mitre 1200'},
                {num:'#1045', cliente:'Carlos Pérez', estado:'ENTREGADO', hora:'18:10', items:['3× Empanada de mariscos'], total:'$4.200', dir:"O'Higgins 880"},
              ].map((p, i) => (
                <div key={i} style={s.pedidoCard}>
                  <div style={s.pedidoHead}>
                    <div>
                      <div style={{display:'flex', alignItems:'center', gap:6}}>
                        <span style={s.pedidoNum}>{p.num}</span>
                        <span style={{...s.tag, ...(p.estado==='NUEVO'?s.tagNuevo:p.estado==='PREPARANDO'?s.tagPrep:s.tagOk)}}>{p.estado}</span>
                      </div>
                      <div style={s.pedidoCliente}>{p.cliente}</div>
                    </div>
                    <div style={s.pedidoHora}>{p.hora}</div>
                  </div>
                  <div style={s.pedidoItems}>
                    {p.items.map((it,j) => <div key={j} style={{fontSize:11, color:'#555', marginBottom:3}}>{it}</div>)}
                  </div>
                  <div style={s.pedidoFooter}>
                    <div>
                      <div style={s.pedidoTotal}>{p.total}</div>
                      <div style={{fontSize:10, color:'#888'}}>📍 {p.dir}</div>
                    </div>
                    {p.estado === 'NUEVO' && <button style={s.btnConfirmar}>Confirmar ✓</button>}
                    {p.estado === 'PREPARANDO' && <button style={s.btnListo}>Listo 🏍</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tabActiva === 'menu' && (
            <div>
              <div style={s.catLabel}>MARISCOS</div>
              {[
                {nombre:'Cazuela de mariscos', desc:'Mejillones, calamares, langostinos', precio:'$6.800'},
                {nombre:'Empanadas de mariscos', desc:'x3 unidades, al horno', precio:'$4.200'},
              ].map((prod, i) => (
                <div key={i} style={s.menuItem}>
                  <div style={{flex:1}}>
                    <div style={s.menuNombre}>{prod.nombre}</div>
                    <div style={{fontSize:10, color:'#888', marginTop:1}}>{prod.desc}</div>
                  </div>
                  <div style={s.menuPrecio}>{prod.precio}</div>
                  <div style={s.iconBtn}>✏️</div>
                  <div style={{...s.iconBtn, background:'#FFF0F0'}}>🗑</div>
                </div>
              ))}
              <button style={s.btnAddProd}>+ Agregar producto</button>
            </div>
          )}
          {tabActiva === 'local' && (
            <div>
              <div style={s.infoCard}>
                <div style={s.infoLabel}>Restaurante</div>
                <div style={s.infoVal}>{rest.nombre}</div>
              </div>
              <div style={s.infoCard}>
                <div style={s.infoLabel}>Categoría</div>
                <div style={s.infoVal}>{rest.cat}</div>
              </div>
              <button style={{...s.btnMain, marginTop:16}} onClick={() => setPantalla('login')}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  bg: {minHeight:'100vh', background:'#f5f5f5', display:'flex', justifyContent:'center', alignItems:'flex-start', padding:'24px 16px', fontFamily:'system-ui,sans-serif'},
  loginCard: {width:340, background:'#fff', borderRadius:24, border:'1px solid #eee', overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.07)'},
  loginHero: {background:'#1A1A1A', padding:'28px 24px', display:'flex', flexDirection:'column', alignItems:'center', gap:8},
  loginTitle: {fontSize:22, fontWeight:700, letterSpacing:-1, color:'#fff'},
  loginSub: {fontSize:11, color:'rgba(255,255,255,0.4)'},
  loginBody: {padding:24},
  fieldLabel: {fontSize:11, fontWeight:600, color:'#1A1A1A', marginBottom:8},
  restOpt: {display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, border:'2px solid #eee', cursor:'pointer', background:'#fafafa', marginBottom:8},
  restOptSel: {borderColor:'#FF4D00', background:'#FFF4EF'},
  restNombre: {fontSize:13, fontWeight:600, color:'#1A1A1A'},
  restCat: {fontSize:10, color:'#888', marginTop:1},
  check: {marginLeft:'auto', width:20, height:20, borderRadius:'50%', background:'#FF4D00', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff'},
  input: {width:'100%', padding:'10px 12px', fontSize:13, borderRadius:10, border:'1.5px solid #eee', background:'#fafafa', color:'#1A1A1A', marginBottom:14, outline:'none'},
  btnMain: {width:'100%', padding:13, background:'#FF4D00', color:'#fff', border:'none', borderRadius:12, fontSize:13, fontWeight:700, cursor:'pointer'},
  phone: {width:340, background:'#fff', borderRadius:32, border:'2px solid #ddd', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 8px 32px rgba(0,0,0,0.10)'},
  topbar: {padding:'14px 16px 10px', background:'#fff', borderBottom:'1px solid #FFE8DC', display:'flex', alignItems:'center', gap:8},
  topbarName: {fontSize:13, fontWeight:700, color:'#1A1A1A'},
  topbarSub: {fontSize:10, color:'#888', marginTop:1},
  tabs: {display:'flex', background:'#fff', borderBottom:'1px solid #FFE8DC'},
  tab: {flex:1, padding:'10px 4px', fontSize:11, fontWeight:600, textAlign:'center' as const, cursor:'pointer', color:'#ccc', borderBottom:'2px solid transparent'},
  tabActive: {color:'#FF4D00', borderBottomColor:'#FF4D00'},
  scroll: {flex:1, overflowY:'auto' as const, padding:12, background:'#FFF4EF', maxHeight:520},
  toggleRow: {display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', borderRadius:12, padding:'12px 14px', marginBottom:12, border:'1px solid #FFE8DC'},
  toggleLabel: {fontSize:12, fontWeight:600, color:'#1A1A1A'},
  toggleSub: {fontSize:10, color:'#888', marginTop:1},
  toggleTrack: {width:42, height:24, borderRadius:20, position:'relative' as const, cursor:'pointer', flexShrink:0},
  toggleThumb: {width:18, height:18, borderRadius:'50%', background:'#fff', position:'absolute' as const, top:3, transition:'.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)'},
  statsRow: {display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:12},
  stat: {background:'#fff', borderRadius:12, padding:'10px 12px', border:'1px solid #FFE8DC', textAlign:'center' as const},
  statVal: {fontSize:20, fontWeight:700, color:'#1A1A1A'},
  statLabel: {fontSize:9, color:'#888', marginTop:2, fontWeight:500},
  sectionTitle: {fontSize:10, fontWeight:600, color:'#888', letterSpacing:1, marginBottom:8},
  pedidoCard: {background:'#fff', borderRadius:14, border:'1px solid #FFE8DC', marginBottom:10, overflow:'hidden'},
  pedidoHead: {padding:'10px 12px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #FFE8DC'},
  pedidoNum: {fontSize:11, fontWeight:700, color:'#FF4D00'},
  pedidoCliente: {fontSize:12, fontWeight:600, color:'#1A1A1A'},
  pedidoHora: {fontSize:10, color:'#888'},
  tag: {fontSize:9, fontWeight:700, padding:'3px 8px', borderRadius:20},
  tagNuevo: {background:'#FFF0E5', color:'#FF4D00', border:'1px solid #FFE8DC'},
  tagPrep: {background:'#FFF9E5', color:'#B8860B', border:'1px solid #FFE8A0'},
  tagOk: {background:'#E8F5E9', color:'#2D6A2D', border:'1px solid #C8E6C9'},
  pedidoItems: {padding:'8px 12px', borderBottom:'1px solid #FFE8DC'},
  pedidoFooter: {padding:'8px 12px', display:'flex', alignItems:'center', justifyContent:'space-between'},
  pedidoTotal: {fontSize:12, fontWeight:700, color:'#1A1A1A'},
  btnConfirmar: {padding:'6px 14px', borderRadius:20, border:'none', fontSize:11, fontWeight:700, cursor:'pointer', background:'#FF4D00', color:'#fff'},
  btnListo: {padding:'6px 14px', borderRadius:20, border:'none', fontSize:11, fontWeight:700, cursor:'pointer', background:'#2D6A2D', color:'#fff'},
  catLabel: {fontSize:10, fontWeight:700, color:'#FF4D00', letterSpacing:1, textTransform:'uppercase' as const, margin:'12px 0 6px'},
  menuItem: {background:'#fff', borderRadius:12, border:'1px solid #FFE8DC', padding:'10px 12px', marginBottom:6, display:'flex', alignItems:'center', gap:10},
  menuNombre: {fontSize:12, fontWeight:600, color:'#1A1A1A'},
  menuPrecio: {fontSize:13, fontWeight:700, color:'#FF4D00'},
  iconBtn: {width:28, height:28, borderRadius:8, background:'#FFF4EF', border:'1px solid #FFE8DC', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:13},
  btnAddProd: {width:'100%', padding:11, background:'#FFF4EF', color:'#FF4D00', border:'1.5px dashed #FF4D00', borderRadius:12, fontSize:12, fontWeight:700, cursor:'pointer', marginTop:4},
  infoCard: {background:'#fff', borderRadius:12, border:'1px solid #FFE8DC', padding:'12px 14px', marginBottom:8},
  infoLabel: {fontSize:10, color:'#888', marginBottom:4},
  infoVal: {fontSize:13, fontWeight:600, color:'#1A1A1A'},
}

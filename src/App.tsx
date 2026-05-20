import { useState } from 'react'
import { supabase } from './supabase'

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
              <span style={s.restEmoji}>{r.emoji}</span>
              <div>
                <div style={s.restNombre}>{r.nombre}</div>
                <div style={s.restCat}>{r.cat}</div>
              </div>
              {restSeleccionado === i && <span style={s.check}>✓</span>}
            </div>
          ))}
          <div style={{...s.fieldLabel, marginTop: 16}}>Contraseña</div>
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
          <div style={s.estadoBadge}>
            <div style={{...s.dot, background: abierto ? '#2D6A2D' : '#ccc'}}></div>
            <span style={{color: abierto ? '#2D6A2D' : '#ccc', fontSize: 11, fontWeight: 600}}>
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
            <>
              <div style={s.toggleRow}>
                <div>
                  <div style={s.toggleLabel}>Estado del local</div>
                  <div style={s.toggleSub}>{abierto ? 'Recibiendo pedidos' : 'Local pausado'}</div>
                </div>
                <div onClick={() => setAbierto(!abierto)}
                  style={{...s.toggleTrack, background: abierto ? '#2D6A2D' : '#ddd'}}>
                  <div style={{...s.toggleThumb, left: abierto ? 21 : 3}}></div>
                </div>
              </div>

              <div style={s.statsRow}>
                <div style={{...s.stat, ...s.statHighlight}}><div style={{...s.statVal, color:'#fff'}}>3</div><div style={{...s.statLabel, color:'rgba(255,255,255,0.7)'}}>Nuevos</div></div>
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
                        <span style={{...s.tag, ...(p.estado==='NUEVO'?s.tagNuevo:p.estado==='PREPARAND

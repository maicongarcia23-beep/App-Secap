import { useState, useMemo, useEffect, useRef } from "react";
import logoSecap from "./assets/logo-secap.png";

const LOGO_B64 = "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";

const hoje = new Date();
const diasDesde = (ds) => Math.floor((hoje - new Date(ds)) / 86400000);
const formatDate = (ds) => { if (!ds) return "—"; const [y,m,d] = ds.split("-"); return `${d}/${m}/${y}`; };
const initials = (n) => n.split(" ").slice(0,2).map(x=>x[0]).join("").toUpperCase();
const nivelLabel = (n) => (["","Ordenado","Ordenado","Comissionado","Designado","Membro"][n]) || "";
const downloadCsv = (filename, rows) => {
  const esc = (v) => `"${String(v ?? "").replace(/"/g,'""')}"`;
  const csv = rows.map(r=>r.map(esc).join(";")).join("\n");
  const blob = new Blob([csv],{type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const C = {
  pageBg:"#f5f7fb", sideBg:"#3C485C", cardBg:"#ffffff", cardBg2:"#f8f9fc",
  border:"#d7dce5", borderMed:"#c4ccd9",
  oliva:"#3C485C", olivaMed:"#55627A", olivaLight:"#eef1f6",
  bege:"#65738D", begeLight:"#8491a8",
  textDark:"#1f2735", textMed:"#49566d", textLight:"#727f96",
  emerald:"#3f7a67", amber:"#9c6b1f", blue:"#3C485C", red:"#8f4242", purple:"#56557d",
};
const avatarColors = [C.oliva,"#4b7fcf","#3b5b92","#2f8f78","#5f56b3","#2f6b9d","#6f8fbf"];
const avatarBg = (n) => avatarColors[n.charCodeAt(0) % avatarColors.length];

const SM = {
  "Ativo":       "background:#e8f5ee;color:#2d6e45;border:1px solid #b8ddc8",
  "Inativo":     "background:#f0ede8;color:#8a7e68;border:1px solid #d4c8b4",
  "Afastado":    "background:#fdf4e0;color:#9a6010;border:1px solid #e8d0a0",
  "Transferido": "background:#e8f0f8;color:#285878;border:1px solid #b4cce0",
};
const SV = {
  "Aguardando retorno":"background:#fdf4e0;color:#9a6010;border:1px solid #e8d0a0",
  "Contatado":         "background:#e8f0f8;color:#285878;border:1px solid #b4cce0",
  "Retornou":          "background:#ecebf8;color:#383890;border:1px solid #c4c0e8",
  "Convertido":        "background:#e8f5ee;color:#2d6e45;border:1px solid #b8ddc8",
};
const SI = {
  "Ativa":          "background:#e8f5ee;color:#2d6e45;border:1px solid #b8ddc8",
  "Em implantação": "background:#fdf4e0;color:#9a6010;border:1px solid #e8d0a0",
  "Inativa":        "background:#f0ede8;color:#8a7e68;border:1px solid #d4c8b4",
};
const SP = {
  "Admin":     "background:#f0eaf8;color:#4a2870;border:1px solid #d0b8e8",
  "Lider":     "background:#e8f0f8;color:#285878;border:1px solid #b4cce0",
  "Secretaria":"background:#e8f8f8;color:#1a5858;border:1px solid #a8d8d8",
  "Membro":    "background:#f0ede8;color:#8a7e68;border:1px solid #d4c8b4",
};
const COR_DOT = {
  "bg-purple-700":"#6040a0","bg-blue-700":"#2060a0","bg-indigo-700":"#4050a0",
  "bg-teal-700":"#205860","bg-emerald-700":"#206048","bg-rose-700":"#802840",
  "bg-amber-700":"#805020","bg-zinc-600":"#607060",
};
const COR_CS = {
  "bg-purple-700":"background:#f0eaf8;color:#4a2870;border:1px solid #d0b8e8",
  "bg-blue-700":"background:#e8f0f8;color:#285878;border:1px solid #b4cce0",
  "bg-indigo-700":"background:#ecebf8;color:#383890;border:1px solid #c4c0e8",
  "bg-teal-700":"background:#e8f5f5;color:#1a5858;border:1px solid #a8d8d8",
  "bg-emerald-700":"background:#e8f5ee;color:#2d6e45;border:1px solid #b8ddc8",
  "bg-rose-700":"background:#fceaec;color:#7a2830;border:1px solid #e8b8c0",
  "bg-amber-700":"background:#fdf4e0;color:#9a6010;border:1px solid #e8d0a0",
  "bg-zinc-600":"background:#f0ede8;color:#8a7e68;border:1px solid #d4c8b4",
};
const cargoStyle = (cargo, cargos) => { const f=cargos?.find(c=>c.nome===cargo); return f?(COR_CS[f.cor]||COR_CS["bg-zinc-600"]):COR_CS["bg-zinc-600"]; };

// --- MOCK DATA -----------------------------------------------------------------
const CARGOS_INIT = [
  {id:1,nome:"Pastor",nivel:1,descricao:"Liderança espiritual e pastoral",cor:"bg-purple-700"},
  {id:2,nome:"Evangelista",nivel:2,descricao:"Ministério de pregação e evangelismo",cor:"bg-blue-700"},
  {id:3,nome:"Presbítero",nivel:2,descricao:"Ancião — governo e cuidado pastoral",cor:"bg-indigo-700"},
  {id:4,nome:"Diácono",nivel:3,descricao:"Serviço e administração da igreja",cor:"bg-teal-700"},
  {id:5,nome:"Obreiro",nivel:4,descricao:"Auxiliar nas atividades ministeriais",cor:"bg-emerald-700"},
  {id:6,nome:"Missionário",nivel:2,descricao:"Missões e plantação de igrejas",cor:"bg-rose-700"},
  {id:7,nome:"Líder de Ministério",nivel:4,descricao:"Responsável por um ministério",cor:"bg-amber-700"},
  {id:8,nome:"Membro",nivel:5,descricao:"Membro sem cargo específico",cor:"bg-zinc-600"},
];
const IGREJAS_INIT = [
  {id:1,nome:"Igreja Central",cidade:"Mogi das Cruzes",estado:"SP",endereco:"Rua das Acácias, 500",pastor:"Pastor João Carlos",telefone:"(11) 4001-0001",email:"central@secap.com.br",status:"Ativa",foto:""},
  {id:2,nome:"Filial Zona Norte",cidade:"Mogi das Cruzes",estado:"SP",endereco:"Av. Brasil, 1200",pastor:"Pastor Ricardo Alves",telefone:"(11) 4001-0002",email:"zonanorte@secap.com.br",status:"Ativa",foto:""},
  {id:3,nome:"Filial Suzano",cidade:"Suzano",estado:"SP",endereco:"Rua das Palmeiras, 88",pastor:"Pr. Marcos Oliveira",telefone:"(11) 4001-0003",email:"suzano@secap.com.br",status:"Ativa",foto:""},
  {id:4,nome:"Ponto Vila Nova",cidade:"Mogi das Cruzes",estado:"SP",endereco:"Rua Violeta, 30",pastor:"Líder Ana Lima",telefone:"(11) 4001-0004",email:"",status:"Em implantação",foto:""},
];
const MINISTERIOS_INIT = [
  {id:1,igrejaId:1,nome:"Louvor e Adoração",lider:"Ana Lima",descricao:"Música e adoração"},
  {id:2,igrejaId:1,nome:"Infantil",lider:"Carla Souza",descricao:"Cuidado das crianças"},
  {id:3,igrejaId:1,nome:"Jovens",lider:"Rafael Torres",descricao:"Jovens e adolescentes"},
  {id:4,igrejaId:2,nome:"Intercessão",lider:"Maria Oliveira",descricao:"Oração e intercessão"},
  {id:5,igrejaId:2,nome:"Jovens ZN",lider:"Paulo Souza",descricao:"Jovens da Zona Norte"},
  {id:6,igrejaId:3,nome:"Ação Social",lider:"João Pedro",descricao:"Evangelismo e assistência"},
];
const MEMBROS_INIT = [
  {id:1,igrejaId:1,nome:"Ana Lima",email:"ana@email.com",telefone:"(11) 98001-0001",status:"Ativo",batismo:"2015-03-10",ministerio:"Louvor e Adoração",cargo:"Líder de Ministério",perfil:"Lider",nascimento:"1990-06-15",endereco:"Rua das Flores, 100",obs:"",foto:""},
  {id:2,igrejaId:1,nome:"Carlos Mendes",email:"carlos@email.com",telefone:"(11) 98001-0002",status:"Ativo",batismo:"2018-07-22",ministerio:"Jovens",cargo:"Membro",perfil:"Membro",nascimento:"1998-11-03",endereco:"Av. Brasil, 55",obs:"",foto:""},
  {id:3,igrejaId:1,nome:"Fernanda Costa",email:"fernanda@email.com",telefone:"(11) 98001-0003",status:"Ativo",batismo:"2020-01-15",ministerio:"Infantil",cargo:"Diácono",perfil:"Lider",nascimento:"1985-02-28",endereco:"Rua São Paulo, 200",obs:"",foto:""},
  {id:4,igrejaId:2,nome:"Ricardo Alves",email:"ricardo@email.com",telefone:"(11) 98001-0004",status:"Ativo",batismo:"2012-09-05",ministerio:"Intercessão",cargo:"Pastor",perfil:"Lider",nascimento:"1975-08-19",endereco:"Rua Azaleia, 37",obs:"",foto:""},
  {id:5,igrejaId:2,nome:"Patrícia Nunes",email:"patricia@email.com",telefone:"(11) 98001-0005",status:"Ativo",batismo:"2019-04-30",ministerio:"Jovens ZN",cargo:"Obreiro",perfil:"Membro",nascimento:"1993-12-07",endereco:"Rua Violeta, 88",obs:"",foto:""},
  {id:6,igrejaId:1,nome:"Marcos Santos",email:"marcos@email.com",telefone:"(11) 98001-0006",status:"Transferido",batismo:"2010-11-20",ministerio:"Louvor e Adoração",cargo:"Presbítero",perfil:"Membro",nascimento:"1982-04-11",endereco:"Rua das Palmeiras, 14",obs:"Transferido para Zona Norte",foto:""},
  {id:7,igrejaId:3,nome:"Juliana Ferreira",email:"juliana@email.com",telefone:"(11) 98001-0007",status:"Ativo",batismo:"2021-06-13",ministerio:"Ação Social",cargo:"Membro",perfil:"Membro",nascimento:"2000-03-22",endereco:"Av. Paulista, 300",obs:"",foto:""},
  {id:8,igrejaId:3,nome:"Roberto Silva",email:"roberto@email.com",telefone:"(11) 98001-0008",status:"Afastado",batismo:"2016-02-08",ministerio:"Ação Social",cargo:"Diácono",perfil:"Membro",nascimento:"1970-09-30",endereco:"Rua Ipê, 5",obs:"",foto:""},
];
const VISITANTES_INIT = [
  {id:1,igrejaId:1,nome:"Thiago Ramos",telefone:"(11) 97001-0001",email:"",dataVisita:"2026-03-30",proximoContato:"2026-04-02",responsavel:"Ana Lima",origem:"Convidado por membro",culto:"Domingo manhã",convidadoPor:"Carlos Mendes",status:"Aguardando retorno",obs:"",historico:[{id:11,data:"2026-03-31",acao:"Mensagem enviada no WhatsApp"}]},
  {id:2,igrejaId:1,nome:"Beatriz Gomes",telefone:"(11) 97001-0002",email:"",dataVisita:"2026-04-06",proximoContato:"2026-04-10",responsavel:"Carla Souza",origem:"Instagram",culto:"Domingo noite",convidadoPor:"Ana Lima",status:"Contatado",obs:"Interessada no ministério infantil",historico:[{id:21,data:"2026-04-07",acao:"Ligação realizada - confirmou interesse"}]},
  {id:3,igrejaId:2,nome:"Leandro Pinto",telefone:"(11) 97001-0003",email:"",dataVisita:"2026-04-06",proximoContato:"2026-04-08",responsavel:"Ricardo Alves",origem:"Ação social",culto:"Quarta ensino",convidadoPor:"Espontâneo",status:"Aguardando retorno",obs:"",historico:[]},
  {id:4,igrejaId:3,nome:"Sonia Barros",telefone:"(11) 97001-0004",email:"",dataVisita:"2026-03-16",proximoContato:"2026-03-20",responsavel:"Juliana Ferreira",origem:"Convidado por membro",culto:"Domingo manhã",convidadoPor:"Juliana Ferreira",status:"Convertido",obs:"Aceitou Jesus na visita",historico:[{id:41,data:"2026-03-17",acao:"Retornou no culto da noite"},{id:42,data:"2026-03-20",acao:"Confissão de fé"}]},
];
const EVENTOS_INIT = [
  {id:1,igrejaId:1,titulo:"Conferência da Família",tipo:"Conferência",data:"2026-05-18",local:"Templo Sede",descricao:"Noite de ensino e comunhão para famílias.",vagas:120,inscricaoPermissao:"Todos",arte:"",inscritos:[{id:101,nome:"Ana Lima",tipo:"Membro",presenca:true,dataInscricao:"2026-04-10"},{id:102,nome:"Thiago Ramos",tipo:"Visitante",presenca:false,dataInscricao:"2026-04-11"}]},
  {id:2,igrejaId:2,titulo:"Retiro de Jovens",tipo:"Retiro",data:"2026-06-07",local:"Chácara Ebenézer",descricao:"Final de semana de crescimento espiritual.",vagas:60,inscricaoPermissao:"Liderança",arte:"",inscritos:[{id:201,nome:"Patrícia Nunes",tipo:"Membro",presenca:false,dataInscricao:"2026-04-09"}]},
];
const COMUNICADOS_INIT = [
  {id:1,igrejaId:1,titulo:"Ensaio extra do louvor",mensagem:"Quinta às 20h no templo sede.",segmento:"Ministério",ministerio:"Louvor e Adoração",data:"2026-04-10"},
  {id:2,igrejaId:null,titulo:"Campanha de oração",mensagem:"21 dias de oração às 6h.",segmento:"Todos",ministerio:"",data:"2026-04-09"},
];
const PEDIDOS_ORACAO_INIT = [
  {id:1,igrejaId:1,nome:"Carlos Mendes",origem:"Membro",pedido:"Oração por emprego",status:"Novo",responsavel:"Ana Lima",data:"2026-04-10"},
  {id:2,igrejaId:2,nome:"Leandro Pinto",origem:"Visitante",pedido:"Saúde da família",status:"Em acompanhamento",responsavel:"Ricardo Alves",data:"2026-04-08"},
];
const USUARIOS_INIT = [
  {id:1,igrejaId:null,nome:"Pastor João Carlos",email:"pastor@secap.com.br",perfil:"Admin",ministerio:"—",ativo:true},
  {id:2,igrejaId:1,nome:"Ana Lima",email:"ana@email.com",perfil:"Lider",ministerio:"Louvor e Adoração",ativo:true},
  {id:3,igrejaId:1,nome:"Carla Souza",email:"carla@email.com",perfil:"Lider",ministerio:"Infantil",ativo:true},
  {id:4,igrejaId:2,nome:"Ricardo Alves",email:"ricardo@email.com",perfil:"Lider",ministerio:"Intercessão",ativo:true},
  {id:5,igrejaId:null,nome:"Secretária Rosa",email:"rosa@secap.com.br",perfil:"Secretaria",ministerio:"—",ativo:true},
];
const FUNCIONALIDADES = [
  { key:"dashboard", label:"Dashboard", grupo:"Visão geral" },
  { key:"igrejas", label:"Igrejas", grupo:"Cadastros" },
  { key:"membros", label:"Membros", grupo:"Cadastros" },
  { key:"visitantes", label:"Visitantes", grupo:"Cadastros" },
  { key:"ministerios", label:"Ministérios", grupo:"Cadastros" },
  { key:"cargos", label:"Cargos", grupo:"Cadastros" },
  { key:"eventos", label:"Eventos", grupo:"Engajamento" },
  { key:"comunicacao", label:"Comunicação", grupo:"Engajamento" },
  { key:"acesso", label:"Acesso e Usuários", grupo:"Administração" },
  { key:"relatorios", label:"Relatórios", grupo:"Administração" },
  { key:"kanbanVisitantes", label:"Kanban de visitantes", grupo:"Operações" },
  { key:"converterVisitante", label:"Converter visitante em membro", grupo:"Operações" },
  { key:"editarMinisterio", label:"Editar participantes de ministério", grupo:"Operações" },
  { key:"uploadFotosIgreja", label:"Enviar foto de fachada", grupo:"Operações" },
];
const allPerms = () => FUNCIONALIDADES.reduce((acc,f)=>({ ...acc, [f.key]:true }),{});
const pickPerms = (keys) => FUNCIONALIDADES.reduce((acc,f)=>({ ...acc, [f.key]:keys.includes(f.key) }),{});
const PERFIS_INIT = [
  { id:1, nome:"Admin", nivel:1, permissoes:allPerms() },
  { id:2, nome:"Lider", nivel:2, permissoes:pickPerms(["dashboard","igrejas","membros","visitantes","ministerios","eventos","comunicacao","relatorios","kanbanVisitantes","converterVisitante","editarMinisterio","uploadFotosIgreja"]) },
  { id:3, nome:"Secretaria", nivel:3, permissoes:pickPerms(["dashboard","membros","visitantes","ministerios","eventos","comunicacao","relatorios","kanbanVisitantes","converterVisitante","editarMinisterio"]) },
  { id:4, nome:"Membro", nivel:5, permissoes:pickPerms(["dashboard"]) },
];
const nivelValido = (n) => {
  const v = Number(n);
  return Number.isFinite(v) && v >= 1 ? Math.floor(v) : 1;
};
const TEMPLATE_PADRAO = {
  whatsapp: [
    "WhatsApp · Primeiro contato: Boas-vindas enviadas e convite para o próximo culto.",
    "WhatsApp · Retorno: Visitante respondeu positivamente e confirmou presença no próximo encontro.",
    "WhatsApp · Ausência: Mensagem de cuidado enviada após ausência no culto.",
  ],
  ligacao: [
    "Ligação · Primeiro contato: Apresentação da igreja e acolhimento inicial realizados.",
    "Ligação · Retorno: Conversa de acompanhamento feita e interesse confirmado.",
    "Ligação · Ausência: Tentativa de contato por ausência; orientação e novo convite realizados.",
  ],
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
const apiUrl = (path) => `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// --- UI PRIMITIVES -------------------------------------------------------------
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}
function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch {}
    return initialValue;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}
async function apiGetState() {
  const r = await fetch(apiUrl("/api/state"));
  if (!r.ok) throw new Error("Falha ao carregar estado");
  return r.json();
}
async function apiPutState(state) {
  const r = await fetch(apiUrl("/api/state"), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state })
  });
  if (!r.ok) throw new Error("Falha ao salvar estado");
  return r.json();
}

function Avatar({ nome, foto, size="md" }) {
  const sz = size==="lg"?48:size==="sm"?28:34;
  const fs = size==="lg"?16:size==="sm"?10:12;
  if (foto) return <img src={foto} alt={nome} style={{ width:sz,height:sz,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:`2px solid ${C.border}` }}/>;
  return <div style={{ width:sz,height:sz,borderRadius:"50%",background:avatarBg(nome),display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:fs,flexShrink:0 }}>{initials(nome)}</div>;
}

function Pill({ label, styleStr }) {
  const obj={};
  (styleStr||"").split(";").filter(Boolean).forEach(x=>{ const[k,...v]=x.split(":"); obj[k.trim()]=v.join(":").trim(); });
  return <span style={{ fontSize:11,padding:"2px 8px",borderRadius:999,fontWeight:600,display:"inline-block",...obj }}>{label}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:100,background:"rgba(40,30,15,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:C.cardBg,borderRadius:"16px 16px 0 0",width:"100%",maxWidth:560,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(40,30,10,0.2)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.cardBg,zIndex:1 }}>
          <h2 style={{ color:C.textDark,fontWeight:700,fontSize:15,margin:0,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>{title}</h2>
          <button onClick={onClose} style={{ color:C.textLight,background:"none",border:"none",cursor:"pointer",fontSize:22,lineHeight:1,padding:"0 4px" }}>?</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return <div><label style={{ display:"block",fontSize:11,color:C.textLight,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>{label}</label>{children}</div>;
}
function Inp({ label, ...p }) {
  return <Field label={label}><input {...p} style={{ width:"100%",background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:C.textDark,outline:"none",boxSizing:"border-box",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}/></Field>;
}
function Slct({ label, children, ...p }) {
  return <Field label={label}><select {...p} style={{ width:"100%",background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:C.textDark,outline:"none",boxSizing:"border-box",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>{children}</select></Field>;
}
function Txta({ label, ...p }) {
  return <Field label={label}><textarea {...p} rows={3} style={{ width:"100%",background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:C.textDark,outline:"none",resize:"none",boxSizing:"border-box",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}/></Field>;
}
function Btn({ children, variant="primary", onClick, style:ex, ...p }) {
  const v = { primary:{background:C.oliva,color:"#fff",border:"none"}, secondary:{background:"transparent",color:C.textMed,border:`1px solid ${C.borderMed}`}, ghost:{background:"transparent",color:C.textLight,border:"none"} }[variant]||{};
  return <button onClick={onClick} {...p} style={{ padding:"10px 18px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",...v,...ex }}>{children}</button>;
}
function Card({ children, style:ex }) {
  return <div style={{ background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:14,...ex }}>{children}</div>;
}
function StatCard({ icon, label, value, sub, accent }) {
  return <Card style={{ padding:14 }}><div style={{ fontSize:20,marginBottom:6 }}>{icon}</div><div style={{ fontSize:22,fontWeight:700,color:accent||C.oliva,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>{value}</div><div style={{ fontSize:11,color:C.textLight,marginTop:1,textTransform:"uppercase",letterSpacing:"0.5px" }}>{label}</div>{sub&&<div style={{ fontSize:11,color:C.textLight,marginTop:3 }}>{sub}</div>}</Card>;
}
function Bar({ pct, color }) {
  return <div style={{ height:5,background:C.border,borderRadius:3,overflow:"hidden" }}><div style={{ height:"100%",width:`${pct}%`,background:color||C.oliva,borderRadius:3 }}/></div>;
}
function RowActions({ onView, onEdit, onDelete }) {
  return (
    <div style={{ display:"flex",gap:2,flexShrink:0 }}>
      {onView&&<button onClick={onView} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px",color:C.textLight }}>Ver</button>}
      <button onClick={onEdit} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px",color:C.textLight }}>Editar</button>
      <button onClick={onDelete} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px",color:C.textLight }}>Excluir</button>
    </div>
  );
}

// --- DRAWER (mobile menu) ------------------------------------------------------
function Drawer({ open, onClose, igrejas, igrejaAtual, setIgrejaAtual, pagina, nav, allowedPages }) {
  const NAV_ALL = [
    {id:"dashboard",icon:"📊",label:"Dashboard"},
    {id:"igrejas",icon:"🏛️",label:"Igrejas"},
    {id:"membros",icon:"👥",label:"Membros"},
    {id:"visitantes",icon:"🤝",label:"Visitantes"},
    {id:"ministerios",icon:"⛪",label:"Ministérios"},
    {id:"eventos",icon:"📅",label:"Eventos"},
    {id:"comunicacao",icon:"📣",label:"Comunicação"},
    {id:"cargos",icon:"🎖️",label:"Cargos"},
    {id:"acesso",icon:"🔐",label:"Acesso"},
    {id:"relatorios",icon:"📋",label:"Relatórios"},
  ];
  return (
    <>
      {open && <div style={{ position:"fixed",inset:0,zIndex:40,background:"rgba(0,0,0,0.45)" }} onClick={onClose}/>}
      <div style={{ position:"fixed",top:0,left:0,height:"100%",width:260,background:C.sideBg,zIndex:50,transform:open?"translateX(0)":"translateX(-100%)",transition:"transform 0.25s ease",display:"flex",flexDirection:"column",overflowY:"auto" }}>
        <div style={{ padding:"24px 16px 16px",borderBottom:"1px solid rgba(255,255,255,0.1)",display:"flex",flexDirection:"column",alignItems:"center",gap:10 }}>
          <img src={logoSecap} alt="SECAP" style={{ width:70,height:56,objectFit:"contain",filter:"brightness(0) invert(1) opacity(0.9)" }}/>
          <div style={{ textAlign:"center",lineHeight:1.4 }}>
            <div style={{ fontSize:8,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700 }}>Igreja Evangélica Pentecostal</div>
            <div style={{ fontSize:11,color:"rgba(255,255,255,0.9)",fontWeight:700,marginTop:2 }}>As Sete Cartas do Apocalipse</div>
          </div>
        </div>
        <div style={{ padding:"10px 12px",borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",marginBottom:5,textTransform:"uppercase",letterSpacing:"1px" }}>Contexto</div>
          <select value={igrejaAtual??""} onChange={e=>{ setIgrejaAtual(e.target.value?parseInt(e.target.value):null); onClose(); }} style={{ width:"100%",background:"#ffffff",border:"1px solid rgba(255,255,255,0.25)",borderRadius:8,padding:"8px 10px",fontSize:13,color:C.textDark,outline:"none",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
            <option value="">Todas as igrejas</option>
            {igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}
          </select>
        </div>
        <nav style={{ flex:1,padding:"8px" }}>
          {NAV_ALL.filter(item=>!allowedPages||allowedPages.includes(item.id)).map(item=>(
            <button key={item.id} onClick={()=>{ nav(item.id); onClose(); }} style={{ width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,marginBottom:2,border:"none",cursor:"pointer",textAlign:"left",fontSize:14,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",background:pagina===item.id?"rgba(255,255,255,0.15)":"transparent",color:pagina===item.id?"#fff":"rgba(255,255,255,0.65)",fontWeight:pagina===item.id?700:400,borderLeft:pagina===item.id?"3px solid #a8c878":"3px solid transparent" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:10,color:"rgba(255,255,255,0.3)",textAlign:"center" }}>
          Fase 2: Eventos · Comunicação
        </div>
      </div>
    </>
  );
}

// --- BOTTOM NAV (mobile) -------------------------------------------------------
const BOTTOM_NAV = [
  {id:"dashboard",icon:"📊",label:"Início"},
  {id:"membros",icon:"👥",label:"Membros"},
  {id:"visitantes",icon:"🤝",label:"Visitantes"},
  {id:"eventos",icon:"📅",label:"Eventos"},
  {id:"ministerios",icon:"⛪",label:"Ministérios"},
  {id:"mais",icon:"☰",label:"Mais"},
];

function BottomNav({ pagina, nav, onMaisClick, allowedPages }) {
  const items = BOTTOM_NAV.filter(item=>item.id==="mais" || !allowedPages || allowedPages.includes(item.id));
  return (
    <div style={{ position:"fixed",bottom:0,left:0,right:0,background:C.cardBg,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:30,boxShadow:"0 -2px 12px rgba(40,30,10,0.1)",paddingBottom:"env(safe-area-inset-bottom,0px)" }}>
      {items.map(item=>{
        const active = item.id==="mais" ? false : pagina===item.id;
        return (
          <button key={item.id} onClick={()=>item.id==="mais"?onMaisClick():nav(item.id)} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px 6px",border:"none",background:"transparent",cursor:"pointer",gap:2 }}>
            <span style={{ fontSize:20 }}>{item.icon}</span>
            <span style={{ fontSize:10,fontWeight:600,color:active?C.oliva:C.textLight,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>{item.label}</span>
            {active && <div style={{ width:20,height:2,background:C.oliva,borderRadius:1,marginTop:1 }}/>}
          </button>
        );
      })}
    </div>
  );
}

// --- SIDEBAR (desktop only) ----------------------------------------------------
const NAV_DESKTOP = [
  {id:"dashboard",icon:"📊",label:"Dashboard"},
  {id:"igrejas",icon:"🏛️",label:"Igrejas"},
  {id:"membros",icon:"👥",label:"Membros"},
  {id:"visitantes",icon:"🤝",label:"Visitantes"},
  {id:"ministerios",icon:"⛪",label:"Ministérios"},
  {id:"eventos",icon:"📅",label:"Eventos"},
  {id:"comunicacao",icon:"📣",label:"Comunicação"},
  {id:"cargos",icon:"🎖️",label:"Cargos"},
  {id:"acesso",icon:"🔐",label:"Acesso"},
  {id:"relatorios",icon:"📋",label:"Relatórios"},
];

function Sidebar({ pagina, nav, igrejas, igrejaAtual, setIgrejaAtual, allowedPages }) {
  return (
    <aside style={{ width:210,background:C.sideBg,display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"hidden" }}>
      <div style={{ padding:"20px 14px 14px",borderBottom:"1px solid rgba(255,255,255,0.1)",display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
        <img src={logoSecap} alt="SECAP" style={{ width:66,height:52,objectFit:"contain",filter:"brightness(0) invert(1) opacity(0.9)" }}/>
        <div style={{ textAlign:"center",lineHeight:1.4 }}>
          <div style={{ fontSize:8,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:"1.5px",fontWeight:700 }}>Igreja Evangélica Pentecostal</div>
          <div style={{ fontSize:10.5,color:"rgba(255,255,255,0.9)",fontWeight:700,marginTop:2 }}>As Sete Cartas<br/>do Apocalipse</div>
        </div>
      </div>
      <div style={{ padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",marginBottom:4,textTransform:"uppercase",letterSpacing:"1px" }}>Contexto</div>
        <select value={igrejaAtual??""} onChange={e=>setIgrejaAtual(e.target.value?parseInt(e.target.value):null)} style={{ width:"100%",background:"#ffffff",border:"1px solid rgba(255,255,255,0.25)",borderRadius:7,padding:"6px 8px",fontSize:11,color:C.textDark,outline:"none",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
          <option value="">Todas as igrejas</option>
          {igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}
        </select>
      </div>
      <nav style={{ flex:1,padding:"4px 6px",overflowY:"auto" }}>
        {NAV_DESKTOP.filter(item=>!allowedPages||allowedPages.includes(item.id)).map(item=>(
          <button key={item.id} onClick={()=>nav(item.id)} style={{ width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 10px",borderRadius:8,marginBottom:2,border:"none",cursor:"pointer",textAlign:"left",fontSize:12,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",background:pagina===item.id?"rgba(255,255,255,0.15)":"transparent",color:pagina===item.id?"#fff":"rgba(255,255,255,0.6)",fontWeight:pagina===item.id?700:400,borderLeft:pagina===item.id?"3px solid #a8c878":"3px solid transparent" }}>
            <span style={{ fontSize:14 }}>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding:"10px 12px",borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:9,color:"rgba(255,255,255,0.3)",textAlign:"center",lineHeight:1.5 }}>Fase 2: Eventos · Comunicação</div>
    </aside>
  );
}

// --- DASHBOARD -----------------------------------------------------------------
function Dashboard({ igrejas, membros, visitantes, ministerios, igrejaAtual }) {
  const sc = arr=>igrejaAtual?arr.filter(x=>x.igrejaId===igrejaAtual):arr;
  const igN = igrejas.find(ig=>ig.id===igrejaAtual);
  const ativos = sc(membros).filter(m=>m.status==="Ativo").length;
  const inativos = sc(membros).filter(m=>m.status!=="Ativo").length;
  const visR = sc(visitantes).filter(v=>diasDesde(v.dataVisita)<=30).length;
  const conv = sc(visitantes).filter(v=>v.status==="Convertido").length;
  const ts = `${String(hoje.getDate()).padStart(2,"0")}/${String(hoje.getMonth()+1).padStart(2,"0")}`;
  const aniv = sc(membros).filter(m=>{ if(!m.nascimento) return false; const[,me,di]=m.nascimento.split("-"); return `${di}/${me}`===ts; });
  const hojeStr = new Date().toISOString().split("T")[0];
  const semRet = sc(visitantes).filter(v=>v.status!=="Convertido"&&((v.proximoContato&&v.proximoContato<=hojeStr)||(!v.proximoContato&&diasDesde(v.dataVisita)>=7)));
  const dotC = { Ativo:C.emerald,Inativo:C.borderMed,Afastado:C.amber,Transferido:C.blue };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <div>
        <h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:"0 0 2px",fontWeight:700 }}>Dashboard</h2>
        <p style={{ color:C.textLight,fontSize:12,margin:0 }}>{igN?`${igN.nome}`:"Visão consolidada"}</p>
      </div>
      {!igrejaAtual && (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8 }}>
          {igrejas.map(ig=>{
            const cnt=membros.filter(m=>m.igrejaId===ig.id&&m.status==="Ativo").length;
            return <Card key={ig.id} style={{ padding:12,textAlign:"center" }}><div style={{ fontSize:10,color:C.textLight,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:2 }}>{ig.nome}</div><div style={{ fontSize:20,fontWeight:700,color:C.oliva,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>{cnt}</div><div style={{ fontSize:9,color:C.textLight }}>ativos</div></Card>;
          })}
        </div>
      )}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10 }}>
        <StatCard icon="👥" label="Membros ativos" value={ativos} sub={`${inativos} afastados`} accent={C.oliva}/>
        <StatCard icon="🤝" label="Visitantes" value={visR} sub={`${conv} convertidos`} accent={C.bege}/>
        <StatCard icon="🏛️" label={igrejaAtual?"Ministérios":"Igrejas ativas"} value={igrejaAtual?sc(ministerios).length:igrejas.filter(i=>i.status==="Ativa").length} accent={C.olivaMed}/>
        <StatCard icon="📭" label="Sem retorno" value={semRet.length} accent={semRet.length>0?C.amber:C.textLight}/>
      </div>
      {semRet.length > 0 && (
        <Card style={{ padding:14 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 10px",fontWeight:700 }}>Visitantes sem retorno</h3>
          {semRet.map(v=>{
            const ig=igrejas.find(x=>x.id===v.igrejaId);
            return <div key={v.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}><div><div style={{ fontSize:13,color:C.textMed,fontWeight:600 }}>{v.nome}</div>{!igrejaAtual&&ig&&<div style={{ fontSize:11,color:C.textLight }}>{ig.nome}</div>}</div><span style={{ fontSize:12,color:C.amber,fontWeight:700 }}>{diasDesde(v.dataVisita)}d</span></div>;
          })}
        </Card>
      )}
      {aniv.length > 0 && (
        <Card style={{ padding:14 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 10px",fontWeight:700 }}>Aniversariantes hoje</h3>
          {aniv.map(m=><div key={m.id} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}><Avatar nome={m.nome}/><div><div style={{ fontSize:13,color:C.textMed,fontWeight:600 }}>{m.nome}</div>{!igrejaAtual&&<div style={{ fontSize:11,color:C.textLight }}>{igrejas.find(ig=>ig.id===m.igrejaId)?.nome}</div>}</div></div>)}
        </Card>
      )}
      <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 12px",fontWeight:700 }}>Membresia</h3>
        {["Ativo","Inativo","Afastado","Transferido"].map(st=>{
          const c=sc(membros).filter(m=>m.status===st).length;
          const t=sc(membros).length;
          const p=t>0?Math.round((c/t)*100):0;
          return <div key={st} style={{ marginBottom:10 }}><div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3 }}><div style={{ display:"flex",alignItems:"center",gap:6 }}><div style={{ width:7,height:7,borderRadius:"50%",background:dotC[st]||C.borderMed }}/><span style={{ color:C.textMed }}>{st}</span></div><span style={{ color:C.textLight }}>{c} ({p}%)</span></div><Bar pct={p} color={dotC[st]}/></div>;
        })}
      </Card>
    </div>
  );
}

function MembroInicio({ igrejaAtual, igrejas, eventos, comunicados, pedidosOracao, membroAtual, setEventos, setPedidosOracao }) {
  const hojeStr = new Date().toISOString().split("T")[0];
  const [novoPedido,setNovoPedido]=useState("");
  const [arteAberta,setArteAberta]=useState(null);
  const eventosBase=(igrejaAtual?eventos.filter(e=>e.igrejaId===igrejaAtual):eventos).filter(e=>e.data>=hojeStr).sort((a,b)=>a.data.localeCompare(b.data));
  const avisosBase=(igrejaAtual?comunicados.filter(c=>c.igrejaId===igrejaAtual||c.igrejaId===null):comunicados).sort((a,b)=>b.data.localeCompare(a.data));
  const oracaoBase=(igrejaAtual?pedidosOracao.filter(p=>p.igrejaId===igrejaAtual):pedidosOracao).sort((a,b)=>b.data.localeCompare(a.data));
  const igrejaNome = igrejaAtual ? igrejas.find(ig=>ig.id===igrejaAtual)?.nome : "Rede";
  const inscritoNoEvento = (ev) => (ev.inscritos||[]).some(i=>i.nome===membroAtual?.nome && i.tipo==="Membro");
  return (
    <>
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div>
        <h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:"0 0 2px",fontWeight:700 }}>Início do Membro</h2>
        <p style={{ color:C.textLight,fontSize:12,margin:0 }}>Informações importantes · {igrejaNome}</p>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
        <StatCard icon="📅" label="Próximos eventos" value={eventosBase.length} accent={C.oliva}/>
        <StatCard icon="📣" label="Avisos recentes" value={avisosBase.slice(0,7).length} accent={C.olivaMed}/>
        <StatCard icon="🙏" label="Pedidos ativos" value={oracaoBase.filter(p=>p.status!=="Concluído").length} accent={C.emerald}/>
      </div>
      <Card style={{ padding:12 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:"0 0 8px" }}>Próximos eventos</h3>
        <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
          {eventosBase.slice(0,5).map(ev=>{
            const jaInscrito = inscritoNoEvento(ev);
            const vagas = parseInt(ev.vagas)||0;
            const lotado = (ev.inscritos||[]).length>=vagas && !jaInscrito;
            const bloqueadoMembro = ev.inscricaoPermissao==="Liderança" && !jaInscrito;
            return <div key={ev.id} style={{ border:`1px solid ${C.border}`,background:C.cardBg2,borderRadius:8,padding:"8px 10px" }}>
              {ev.arte && <div style={{ width:"100%",height:110,borderRadius:8,overflow:"hidden",marginBottom:8,border:`1px solid ${C.border}`,background:"#fff",position:"relative" }}>
                <img src={ev.arte} alt={`Arte ${ev.titulo}`} style={{ width:"100%",height:"100%",objectFit:"contain",objectPosition:"center" }}/>
                <button onClick={()=>setArteAberta({src:ev.arte,titulo:ev.titulo})} style={{ position:"absolute",right:6,bottom:6,background:"rgba(0,0,0,0.6)",color:"#fff",border:"none",borderRadius:6,padding:"4px 6px",fontSize:10,cursor:"pointer" }}>Tela cheia</button>
              </div>}
              <div style={{ display:"flex",justifyContent:"space-between",gap:8,alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:13,color:C.textDark,fontWeight:700 }}>{ev.titulo}</div>
                  <div style={{ fontSize:11,color:C.textLight }}>{formatDate(ev.data)} · {ev.local} · {ev.inscricaoPermissao==="Liderança"?"Inscrição via liderança — fale com a liderança ou secretaria para participar":"Inscrição aberta"}</div>
                </div>
                {membroAtual && (
                  !jaInscrito
                    ? <Btn variant="secondary" style={{ padding:"4px 8px",fontSize:11 }} disabled={lotado||bloqueadoMembro} onClick={()=>{
                      if(lotado||bloqueadoMembro) return;
                      setEventos(prev=>prev.map(x=>x.id!==ev.id?x:{...x,inscritos:[...(x.inscritos||[]),{id:Date.now(),nome:membroAtual.nome,tipo:"Membro",presenca:false,dataInscricao:hojeStr}]}));
                    }}>{bloqueadoMembro?"Fale com liderança/secretaria":(lotado?"Lotado":"Inscrever")}</Btn>
                    : <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setEventos(prev=>prev.map(x=>x.id!==ev.id?x:{...x,inscritos:(x.inscritos||[]).filter(i=>!(i.nome===membroAtual.nome&&i.tipo==="Membro"))}))}>Cancelar</Btn>
                )}
              </div>
            </div>;
          })}
          {!eventosBase.length&&<div style={{ fontSize:12,color:C.textLight }}>Sem eventos programados.</div>}
        </div>
      </Card>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
        <Card style={{ padding:12 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:"0 0 8px" }}>Comunicados</h3>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {avisosBase.slice(0,6).map(a=><div key={a.id} style={{ border:`1px solid ${C.border}`,background:C.cardBg2,borderRadius:8,padding:"8px 10px" }}>
              <div style={{ fontSize:12,color:C.textDark,fontWeight:700 }}>{a.titulo}</div>
              <div style={{ fontSize:11,color:C.textLight }}>{formatDate(a.data)} · {a.segmento}</div>
              <div style={{ fontSize:12,color:C.textMed,marginTop:4 }}>{a.mensagem}</div>
            </div>)}
            {!avisosBase.length&&<div style={{ fontSize:12,color:C.textLight }}>Nenhum comunicado recente.</div>}
          </div>
        </Card>
        <Card style={{ padding:12 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:"0 0 8px" }}>Pedidos de oração</h3>
          <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:8,padding:8,marginBottom:8 }}>
            <Txta label="Enviar novo pedido" value={novoPedido} onChange={e=>setNovoPedido(e.target.value)} />
            <div style={{ display:"flex",justifyContent:"flex-end",marginTop:6 }}>
              <Btn variant="secondary" style={{ padding:"6px 10px",fontSize:11 }} onClick={()=>{
                if(!novoPedido.trim()) return alert("Escreva o pedido de oração.");
                setPedidosOracao(prev=>[...prev,{
                  id:Date.now(),
                  igrejaId:igrejaAtual||membroAtual?.igrejaId||igrejas[0]?.id,
                  nome:membroAtual?.nome||"Membro",
                  origem:"Membro",
                  pedido:novoPedido.trim(),
                  status:"Novo",
                  responsavel:"",
                  data:hojeStr,
                }]);
                setNovoPedido("");
              }}>Enviar pedido</Btn>
            </div>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {oracaoBase.slice(0,6).map(ped=><div key={ped.id} style={{ border:`1px solid ${C.border}`,background:C.cardBg2,borderRadius:8,padding:"8px 10px" }}>
              <div style={{ fontSize:12,color:C.textDark,fontWeight:700 }}>{ped.nome||"Pedido anônimo"}</div>
              <div style={{ fontSize:11,color:C.textLight }}>{formatDate(ped.data)} · {ped.status}</div>
              <div style={{ fontSize:12,color:C.textMed,marginTop:4 }}>{ped.pedido}</div>
            </div>)}
            {!oracaoBase.length&&<div style={{ fontSize:12,color:C.textLight }}>Nenhum pedido recente.</div>}
          </div>
        </Card>
      </div>
    </div>
    {arteAberta && <Modal title={`Arte · ${arteAberta.titulo}`} onClose={()=>setArteAberta(null)}>
      <div style={{ width:"100%",height:"70vh",background:"#fff",border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden" }}>
        <img src={arteAberta.src} alt={arteAberta.titulo} style={{ width:"100%",height:"100%",objectFit:"contain",objectPosition:"center" }}/>
      </div>
    </Modal>}
    </>
  );
}

// --- MEMBROS -------------------------------------------------------------------
// --- CARTEIRINHA ---------------------------------------------------------------
function Carteirinha({ membro, igreja, onClose }) {
  const cardRef = useState(null);
  const ig = igreja;

  const handlePrint = () => {
    const el = document.getElementById("carteirinha-print");
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Carteirinha</title><style>
      @import url('https://fonts.googleapis.com/css2?family=Georgia');
      body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f0ebe0;font-family:Georgia,serif;}
      @media print{body{background:white;}@page{size:85.6mm 54mm;margin:0;}}
    </style></head><body>${el.outerHTML}</body></html>`);
    w.document.close();
    setTimeout(()=>{ w.print(); w.close(); }, 500);
  };

  const statusStyle = SM[membro.status] || "";
  const statusObj = {};
  statusStyle.split(";").filter(Boolean).forEach(x=>{ const[k,...v]=x.split(":"); statusObj[k.trim()]=v.join(":").trim(); });

  return (
    <Modal title="Carteirinha do Membro" onClose={onClose}>
      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:16 }}>

        {/* CARD — proporção crédito 85.6 × 54mm */}
        <div id="carteirinha-print" style={{
          width:340, height:215,
          background:`linear-gradient(135deg, ${C.sideBg} 0%, #3d5228 60%, #4a6030 100%)`,
          borderRadius:14, overflow:"hidden", position:"relative",
          boxShadow:"0 8px 32px rgba(40,30,10,0.3)", flexShrink:0,
          fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",
        }}>
          {/* Textura de fundo */}
          <div style={{ position:"absolute",inset:0,opacity:0.04,backgroundImage:"repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",backgroundSize:"8px 8px" }}/>

          {/* Tarja topo verde oliva */}
          <div style={{ position:"absolute",top:0,left:0,right:0,height:48,background:"rgba(0,0,0,0.25)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <img src={logoSecap} alt="" style={{ width:28,height:22,objectFit:"contain",filter:"brightness(0) invert(1) opacity(0.9)" }}/>
              <div>
                <div style={{ fontSize:6.5,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:"1px",lineHeight:1.2 }}>Igreja Evangélica Pentecostal</div>
                <div style={{ fontSize:8.5,color:"rgba(255,255,255,0.95)",fontWeight:700,lineHeight:1.2 }}>As Sete Cartas do Apocalipse</div>
              </div>
            </div>
            <div style={{ fontSize:8,color:"rgba(255,255,255,0.5)",textAlign:"right" }}>
              <div>SECAP</div>
              <div>Cartão de Membro</div>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div style={{ position:"absolute",top:56,left:14,right:14,bottom:12,display:"flex",gap:12,alignItems:"flex-start" }}>
            {/* Foto */}
            <div style={{ flexShrink:0 }}>
              {membro.foto
                ? <img src={membro.foto} alt="" style={{ width:72,height:88,objectFit:"cover",borderRadius:8,border:"2px solid rgba(255,255,255,0.3)" }}/>
                : <div style={{ width:72,height:88,borderRadius:8,background:avatarBg(membro.nome),display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff",border:"2px solid rgba(255,255,255,0.3)" }}>{initials(membro.nome)}</div>
              }
            </div>

            {/* Dados */}
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontSize:15,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:4 }}>{membro.nome}</div>

              {membro.cargo && (
                <div style={{ display:"inline-block",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:999,padding:"2px 10px",fontSize:9,color:"rgba(255,255,255,0.9)",fontWeight:600,marginBottom:8 }}>
                  {membro.cargo}
                </div>
              )}

              <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
                {[
                  ["Igreja", ig?.nome || "—"],
                  ["Nascimento", formatDate(membro.nascimento)],
                  ["Batismo", formatDate(membro.batismo)],
                ].map(([k,v]) => (
                  <div key={k} style={{ display:"flex",gap:4,alignItems:"baseline" }}>
                    <span style={{ fontSize:8,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.5px",whiteSpace:"nowrap" }}>{k}</span>
                    <span style={{ fontSize:10,color:"rgba(255,255,255,0.9)",fontWeight:600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:28,background:"rgba(0,0,0,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 14px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:6 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",...statusObj }}/>
              <span style={{ fontSize:9,color:"rgba(255,255,255,0.7)" }}>{membro.status}</span>
            </div>
            <span style={{ fontSize:8,color:"rgba(255,255,255,0.4)",letterSpacing:"1px" }}>secap.com.br</span>
          </div>
        </div>

        {/* Aviso se sem foto */}
        {!membro.foto && (
          <div style={{ fontSize:12,color:C.amber,textAlign:"center",background:"#fdf4e0",border:"1px solid #e8d0a0",borderRadius:8,padding:"8px 14px" }}>
            Adicione uma foto ao membro para a carteirinha ficar completa
          </div>
        )}

        <div style={{ display:"flex",gap:8,width:"100%" }}>
          <Btn variant="secondary" onClick={onClose} style={{ flex:1 }}>Fechar</Btn>
          <Btn onClick={handlePrint} style={{ flex:1 }}>Imprimir</Btn>
        </div>
      </div>
    </Modal>
  );
}

// --- MEMBROS -------------------------------------------------------------------
function Membros({ membros, setMembros, ministerios, igrejas, cargos, igrejaAtual }) {
  const [busca,setBusca]=useState("");
  const [fSt,setFSt]=useState("Todos");
  const [modal,setModal]=useState(null);
  const [detalhe,setDetalhe]=useState(null);
  const [carteirinha,setCarteirinha]=useState(null);
  const EMPTY={nome:"",email:"",telefone:"",status:"Ativo",batismo:"",ministerio:"",cargo:"Membro",perfil:"Membro",nascimento:"",endereco:"",igrejaId:igrejaAtual||igrejas[0]?.id,obs:"",foto:""};
  const base=igrejaAtual?membros.filter(m=>m.igrejaId===igrejaAtual):membros;
  const filtered=useMemo(()=>base.filter(m=>{ const q=busca.toLowerCase(); return(!q||m.nome.toLowerCase().includes(q)||m.telefone.includes(q))&&(fSt==="Todos"||m.status===fSt); }),[base,busca,fSt]);
  const save=f=>{ if(modal.mode==="new") setMembros(p=>[...p,{...f,id:Date.now()}]); else setMembros(p=>p.map(m=>m.id===f.id?f:m)); setModal(null); };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Membros</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{filtered.length} de {base.length}</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Novo</Btn>
      </div>
      <div style={{ display:"flex",gap:8 }}>
        <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar..." style={{ flex:1,background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:C.textDark,outline:"none",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}/>
        <select value={fSt} onChange={e=>setFSt(e.target.value)} style={{ background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 10px",fontSize:13,color:C.textDark,outline:"none",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
          <option>Todos</option>{["Ativo","Inativo","Afastado","Transferido"].map(x=><option key={x}>{x}</option>)}
        </select>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {filtered.map(m=>{
          const ig=igrejas.find(x=>x.id===m.igrejaId);
          return (
            <Card key={m.id} style={{ padding:"12px 14px",display:"flex",alignItems:"center",gap:12 }}>
              <Avatar nome={m.nome} foto={m.foto}/>
              <div style={{ flex:1,minWidth:0 }} onClick={()=>setDetalhe(m)}>
                <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                  <span style={{ color:C.textDark,fontWeight:700,fontSize:14 }}>{m.nome}</span>
                  <Pill label={m.status} styleStr={SM[m.status]||""}/>
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                  {m.cargo} · {m.ministerio||"—"}{!igrejaAtual&&ig?` · ${ig.nome}`:""}
                </div>
              </div>
              <RowActions onEdit={()=>setModal({mode:"edit",data:{...m}})} onDelete={()=>{ if(window.confirm("Remover?")) setMembros(p=>p.filter(x=>x.id!==m.id)); }}/>
            </Card>
          );
        })}
        {!filtered.length && <div style={{ textAlign:"center",padding:"48px 0",color:C.textLight,fontSize:13 }}>Nenhum membro encontrado.</div>}
      </div>
      {modal && <MembroModal mode={modal.mode} data={modal.data} ministerios={ministerios} igrejas={igrejas} cargos={cargos} onSave={save} onClose={()=>setModal(null)}/>}
      {detalhe && (
        <Modal title="Perfil do Membro" onClose={()=>setDetalhe(null)}>
          <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
            {/* Foto grande */}
            <div style={{ display:"flex",alignItems:"center",gap:14 }}>
              <Avatar nome={detalhe.nome} foto={detalhe.foto} size="lg"/>
              <div>
                <div style={{ color:C.textDark,fontWeight:700,fontSize:16 }}>{detalhe.nome}</div>
                <div style={{ display:"flex",gap:4,flexWrap:"wrap",marginTop:4 }}>
                  <Pill label={detalhe.status} styleStr={SM[detalhe.status]||""}/>
                  {detalhe.cargo&&<Pill label={detalhe.cargo} styleStr={cargoStyle(detalhe.cargo,cargos)}/>}
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:4 }}>{igrejas.find(ig=>ig.id===detalhe.igrejaId)?.nome}</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              {[["Telefone",detalhe.telefone||"—"],["E-mail",detalhe.email||"—"],["Ministério",detalhe.ministerio||"—"],["Batismo",formatDate(detalhe.batismo)],["Nascimento",formatDate(detalhe.nascimento)],["Endereço",detalhe.endereco||"—"]].map(([k,v])=><div key={k}><div style={{fontSize:10,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:2,fontWeight:600}}>{k}</div><div style={{fontSize:13,color:C.textMed}}>{v}</div></div>)}
            </div>
            {detalhe.obs&&<div><div style={{fontSize:10,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4,fontWeight:600}}>Observações</div><p style={{fontSize:13,color:C.textMed,background:C.cardBg2,borderRadius:10,padding:12,margin:0,border:`1px solid ${C.border}`}}>{detalhe.obs}</p></div>}
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              <Btn onClick={()=>{ setCarteirinha(detalhe); setDetalhe(null); }} style={{ flex:1,minWidth:120 }}>Carteirinha</Btn>
              <Btn variant="secondary" onClick={()=>{ setDetalhe(null); setModal({mode:"edit",data:{...detalhe}}); }} style={{ flex:1,minWidth:100 }}>Editar</Btn>
              <Btn variant="secondary" onClick={()=>setDetalhe(null)} style={{ flex:1,minWidth:80 }}>Fechar</Btn>
            </div>
          </div>
        </Modal>
      )}
      {carteirinha && (
        <Carteirinha
          membro={carteirinha}
          igreja={igrejas.find(ig=>ig.id===carteirinha.igrejaId)}
          onClose={()=>setCarteirinha(null)}
        />
      )}
    </div>
  );
}

function MembroModal({ mode, data, ministerios, igrejas, cargos, onSave, onClose }) {
  const [f,setF]=useState(data);
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  const mins=ministerios.filter(m=>m.igrejaId===parseInt(f.igrejaId));

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => s("foto", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Modal title={mode==="new"?"Novo Membro":"Editar Membro"} onClose={onClose}>
      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
        {/* Upload de foto */}
        <div>
          <label style={{ display:"block",fontSize:11,color:C.textLight,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>Foto do Membro</label>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            {f.foto
              ? <img src={f.foto} alt="" style={{ width:72,height:72,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.border}`,flexShrink:0 }}/>
              : <div style={{ width:72,height:72,borderRadius:"50%",background:f.nome?avatarBg(f.nome):C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0 }}>{f.nome?initials(f.nome):"?"}</div>
            }
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              <label style={{ background:C.oliva,color:"#fff",borderRadius:8,padding:"8px 16px",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"center" }}>
                Escolher foto
                <input type="file" accept="image/*" capture="user" onChange={handleFoto} style={{ display:"none" }}/>
              </label>
              {f.foto && <button onClick={()=>s("foto","")} style={{ background:"transparent",border:`1px solid ${C.borderMed}`,borderRadius:8,padding:"6px 12px",fontSize:12,color:C.textLight,cursor:"pointer" }}>Remover foto</button>}
            </div>
          </div>
        </div>

        <Slct label="Igreja *" value={f.igrejaId} onChange={e=>s("igrejaId",parseInt(e.target.value))}>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
        <Inp label="Nome completo *" value={f.nome} onChange={e=>s("nome",e.target.value)} placeholder="Nome do membro"/>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Inp label="Telefone" value={f.telefone} onChange={e=>s("telefone",e.target.value)}/><Inp label="E-mail" value={f.email} onChange={e=>s("email",e.target.value)}/></div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Inp label="Nascimento" type="date" value={f.nascimento} onChange={e=>s("nascimento",e.target.value)}/><Inp label="Batismo" type="date" value={f.batismo} onChange={e=>s("batismo",e.target.value)}/></div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
          <Slct label="Status" value={f.status} onChange={e=>s("status",e.target.value)}>{["Ativo","Inativo","Afastado","Transferido"].map(x=><option key={x}>{x}</option>)}</Slct>
          <Slct label="Cargo" value={f.cargo} onChange={e=>s("cargo",e.target.value)}><option value="">— Nenhum —</option>{[...cargos].sort((a,b)=>a.nivel-b.nivel).map(c=><option key={c.id}>{c.nome}</option>)}</Slct>
        </div>
        <Slct label="Perfil de acesso" value={f.perfil} onChange={e=>s("perfil",e.target.value)}>{["Membro","Lider","Secretaria","Admin"].map(x=><option key={x}>{x}</option>)}</Slct>
        <Slct label="Ministério" value={f.ministerio} onChange={e=>s("ministerio",e.target.value)}><option value="">— Nenhum —</option>{mins.map(m=><option key={m.id}>{m.nome}</option>)}</Slct>
        <Inp label="Endereço" value={f.endereco} onChange={e=>s("endereco",e.target.value)}/>
        <Txta label="Observações" value={f.obs} onChange={e=>s("obs",e.target.value)}/>
        <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={onClose}>Cancelar</Btn><Btn onClick={()=>{ if(!f.nome.trim()) return alert("Nome obrigatório"); onSave(f); }}>Salvar</Btn></div>
      </div>
    </Modal>
  );
}

// --- VISITANTES ----------------------------------------------------------------
function Visitantes({ visitantes, setVisitantes, igrejas, igrejaAtual, setMembros, templatesContato, setTemplatesContato }) {
  const [modal,setModal]=useState(null); const [busca,setBusca]=useState("");
  const [modalTemplates,setModalTemplates]=useState(null);
  const [filtro,setFiltro]=useState("todos");
  const [visao,setVisao]=useState("lista");
  const [draggingId,setDraggingId]=useState(null);
  const [dropStatus,setDropStatus]=useState("");
  const CULTOS=["Domingo manhã","Domingo noite","Quarta ensino","Sexta jovens","Especial"];
  const ORIGENS=["Convidado por membro","Instagram","Facebook","YouTube","Ação social","Evento","Indicação","Espontâneo"];
  const STATUS_FUNIL=["Aguardando retorno","Contatado","Retornou","Convertido"];
  const hojeStr = new Date().toISOString().split("T")[0];
  const EMPTY={nome:"",telefone:"",email:"",dataVisita:hojeStr,proximoContato:hojeStr,culto:"Domingo manhã",convidadoPor:"",responsavel:"",origem:"Convidado por membro",status:"Aguardando retorno",igrejaId:igrejaAtual||igrejas[0]?.id,obs:"",historico:[]};
  const baseRaw=igrejaAtual?visitantes.filter(v=>v.igrejaId===igrejaAtual):visitantes;
  const base=baseRaw.map(v=>({
    ...v,
    proximoContato:v.proximoContato||v.dataVisita,
    responsavel:v.responsavel||"",
    origem:v.origem||"Espontâneo",
    historico:Array.isArray(v.historico)?v.historico:[]
  }));
  const vencido = (v) => v.status!=="Convertido" && v.proximoContato && v.proximoContato<=hojeStr;
  const filtered=base.filter(v=>{
    const matchBusca=!busca||v.nome.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro=filtro==="todos" ? true : vencido(v);
    return matchBusca && matchFiltro;
  });
  const mesAtual = hojeStr.slice(0,7);
  const doMes = base.filter(v=>v.dataVisita?.startsWith(mesAtual));
  const taxaContato = doMes.length?Math.round((doMes.filter(v=>["Contatado","Retornou","Convertido"].includes(v.status)).length/doMes.length)*100):0;
  const taxaRetorno = doMes.length?Math.round((doMes.filter(v=>["Retornou","Convertido"].includes(v.status)).length/doMes.length)*100):0;
  const taxaConversao = doMes.length?Math.round((doMes.filter(v=>v.status==="Convertido").length/doMes.length)*100):0;
  const save=f=>{ if(modal.mode==="new") setVisitantes(p=>[...p,{...f,id:Date.now()}]); else setVisitantes(p=>p.map(v=>v.id===f.id?f:v)); setModal(null); };
  const addHistorico = (id, acao) => {
    setVisitantes(p=>p.map(v=>v.id!==id?v:{...v,historico:[...(v.historico||[]),{id:Date.now(),data:hojeStr,acao}]}));
  };
  const addHistoricoModal = (acao) => {
    setModal(p=>({...p,data:{...p.data,historico:[...(p.data.historico||[]),{id:Date.now(),data:hojeStr,acao}]}}));
  };
  const getTemplatesIgreja = (igrejaId) => {
    if(!igrejaId) return TEMPLATE_PADRAO;
    return templatesContato?.[igrejaId] || TEMPLATE_PADRAO;
  };
  const moverNoFunil = (visitanteId, novoStatus) => {
    const atual = base.find(v=>v.id===visitanteId);
    if(!atual || atual.status===novoStatus) return;
    setVisitantes(p=>p.map(v=>v.id===visitanteId?{...v,status:novoStatus}:v));
    addHistorico(visitanteId, `Status alterado para ${novoStatus}`);
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Visitantes</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{base.length} registros</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Registrar</Btn>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
        <StatCard icon="CT" label="Taxa contato" value={`${taxaContato}%`} accent={C.oliva}/>
        <StatCard icon="RT" label="Taxa retorno" value={`${taxaRetorno}%`} accent={C.olivaMed}/>
        <StatCard icon="CV" label="Taxa conversão" value={`${taxaConversao}%`} accent={C.emerald}/>
      </div>
      <div style={{ display:"flex",gap:8 }}>
        <Btn variant={filtro==="todos"?"primary":"secondary"} onClick={()=>setFiltro("todos")}>Todos</Btn>
        <Btn variant={filtro==="vencidos"?"primary":"secondary"} onClick={()=>setFiltro("vencidos")}>Vencidos hoje</Btn>
        <Btn variant={visao==="lista"?"primary":"secondary"} onClick={()=>setVisao("lista")}>Lista</Btn>
        <Btn variant={visao==="kanban"?"primary":"secondary"} onClick={()=>setVisao("kanban")}>Kanban</Btn>
      </div>
      <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar visitante..." style={{ background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 12px",fontSize:14,color:C.textDark,outline:"none",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",width:"100%",boxSizing:"border-box" }}/>
      {visao==="lista" && <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {filtered.map(v=>{
          const dias=diasDesde(v.dataVisita); const alerta=vencido(v);
          const ig=igrejas.find(x=>x.id===v.igrejaId);
          return (
            <Card key={v.id} style={{ padding:"12px 14px",display:"flex",alignItems:"center",gap:12,borderColor:alerta?"#e8d0a0":C.border,background:alerta?"#fffdf5":C.cardBg }}>
              <Avatar nome={v.nome}/>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                  <span style={{ color:C.textDark,fontWeight:700,fontSize:14 }}>{v.nome}</span>
                  <Pill label={v.status} styleStr={SV[v.status]||""}/>
                  {alerta&&<span style={{ fontSize:11,color:C.amber,fontWeight:700 }}>Contato vencido</span>}
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>
                  {formatDate(v.dataVisita)} · {v.culto}{!igrejaAtual&&ig?` · ${ig.nome}`:""}
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>
                  Próx. contato: {formatDate(v.proximoContato)} · Responsável: {v.responsavel||"—"}
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>
                  Origem: {v.origem}
                </div>
                {!!v.historico?.length && <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>
                  Último contato: {v.historico[v.historico.length-1]?.data} · {v.historico[v.historico.length-1]?.acao}
                </div>}
              </div>
              <div style={{ display:"flex",gap:2 }}>
                {v.status!=="Convertido"&&<button onClick={()=>{
                  setVisitantes(p=>p.map(x=>x.id===v.id?{...x,status:"Convertido"}:x));
                }} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px" }} title="Marcar como convertido">✓</button>}
                {v.status!=="Convertido"&&<button onClick={()=>{
                  const jaExiste = window.confirm(`Converter "${v.nome}" em membro agora?`);
                  if(!jaExiste) return;
                  setMembros(p=>[...p,{
                    id:Date.now(),
                    igrejaId:v.igrejaId,
                    nome:v.nome,
                    email:v.email||"",
                    telefone:v.telefone||"",
                    status:"Ativo",
                    batismo:"",
                    ministerio:"",
                    cargo:"Membro",
                    perfil:"Membro",
                    nascimento:"",
                    endereco:"",
                    obs:`Convertido de visitante em ${formatDate(hojeStr)}`,
                    foto:""
                  }]);
                  setVisitantes(p=>p.map(x=>x.id===v.id?{...x,status:"Convertido"}:x));
                }} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px" }} title="Converter em membro">👤</button>}
                <button onClick={()=>addHistorico(v.id,"Mensagem enviada no WhatsApp")} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,padding:"4px 6px" }} title="Registrar contato">💬</button>
                <RowActions onEdit={()=>setModal({mode:"edit",data:{...v}})} onDelete={()=>{ if(window.confirm("Remover?")) setVisitantes(p=>p.filter(x=>x.id!==v.id)); }}/>
              </div>
            </Card>
          );
        })}
        {!filtered.length&&<div style={{ textAlign:"center",padding:"48px 0",color:C.textLight,fontSize:13 }}>Nenhum visitante encontrado.</div>}
      </div>}
      {visao==="kanban" && <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10 }}>
        {STATUS_FUNIL.map(st=>{
          const col=filtered.filter(v=>v.status===st);
          const dropAtivo=dropStatus===st;
          return <Card key={st} style={{ padding:10,border:dropAtivo?`2px dashed ${C.oliva}`:`1px solid ${C.border}`,background:dropAtivo?C.olivaLight:C.cardBg }}
            onDragEnter={(e)=>{ e.preventDefault(); setDropStatus(st); }}
            onDragOver={(e)=>{ e.preventDefault(); e.dataTransfer.dropEffect="move"; setDropStatus(st); }}
            onDragLeave={()=>setDropStatus((curr)=>curr===st?"":curr)}
            onDrop={(e)=>{
              e.preventDefault();
              const payload=e.dataTransfer.getData("text/plain");
              if(!payload) return;
              const [idStr] = payload.split("|");
              const idNum=parseInt(idStr,10);
              if(!Number.isFinite(idNum)) return;
              moverNoFunil(idNum, st);
              setDropStatus("");
              setDraggingId(null);
            }}
          >
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
              <Pill label={st} styleStr={SV[st]||SV["Contatado"]}/>
              <span style={{ fontSize:11,color:C.textLight }}>{col.length}</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              {col.map(v=><div key={v.id}
                draggable
                onDragStart={(e)=>{
                  e.dataTransfer.setData("text/plain",`${v.id}|${v.status}`);
                  e.dataTransfer.effectAllowed="move";
                  setDraggingId(v.id);
                }}
                onDragEnd={()=>{ setDraggingId(null); setDropStatus(""); }}
                style={{ border:`1px solid ${C.border}`,borderRadius:8,padding:8,background:C.cardBg2,cursor:"grab",opacity:draggingId===v.id?0.55:1 }}
              >
                <div style={{ fontSize:13,color:C.textDark,fontWeight:700 }}>{v.nome}</div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>{v.responsavel||"Sem responsável"} · {formatDate(v.proximoContato)}</div>
                <div style={{ display:"flex",gap:4,marginTop:6,flexWrap:"wrap" }}>
                  {st!=="Convertido" && <Btn variant="secondary" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>{
                    const idx=STATUS_FUNIL.indexOf(v.status);
                    const next=STATUS_FUNIL[Math.min(idx+1,STATUS_FUNIL.length-1)];
                    moverNoFunil(v.id, next);
                  }}>Avançar</Btn>}
                  <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setModal({mode:"edit",data:{...v}})}>Editar</Btn>
                </div>
              </div>)}
              {!col.length&&<div style={{ fontSize:11,color:C.textLight,textAlign:"center",padding:"10px 0" }}>Sem visitantes</div>}
            </div>
          </Card>;
        })}
      </div>}
      {modal && (
        <Modal title={modal.mode==="new"?"Registrar Visita":"Editar Visitante"} onClose={()=>setModal(null)}>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <Slct label="Igreja" value={modal.data.igrejaId} onChange={e=>setModal(p=>({...p,data:{...p.data,igrejaId:parseInt(e.target.value)}}))}>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
            <Inp label="Nome *" value={modal.data.nome} onChange={e=>setModal(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Inp label="Telefone" value={modal.data.telefone} onChange={e=>setModal(p=>({...p,data:{...p.data,telefone:e.target.value}}))}/><Inp label="Data" type="date" value={modal.data.dataVisita} onChange={e=>setModal(p=>({...p,data:{...p.data,dataVisita:e.target.value}}))}/></div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Inp label="Próximo contato" type="date" value={modal.data.proximoContato||""} onChange={e=>setModal(p=>({...p,data:{...p.data,proximoContato:e.target.value}}))}/><Inp label="Responsável" value={modal.data.responsavel||""} onChange={e=>setModal(p=>({...p,data:{...p.data,responsavel:e.target.value}}))}/></div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <Slct label="Culto" value={modal.data.culto} onChange={e=>setModal(p=>({...p,data:{...p.data,culto:e.target.value}}))}>{CULTOS.map(c=><option key={c}>{c}</option>)}</Slct>
              <Slct label="Status" value={modal.data.status} onChange={e=>setModal(p=>({...p,data:{...p.data,status:e.target.value}}))}>{STATUS_FUNIL.map(x=><option key={x}>{x}</option>)}</Slct>
            </div>
            <Slct label="Origem da visita" value={modal.data.origem||"Espontâneo"} onChange={e=>setModal(p=>({...p,data:{...p.data,origem:e.target.value}}))}>{ORIGENS.map(o=><option key={o}>{o}</option>)}</Slct>
            <Inp label="Convidado por" value={modal.data.convidadoPor} onChange={e=>setModal(p=>({...p,data:{...p.data,convidadoPor:e.target.value}}))}/>
            <Txta label="Observações" value={modal.data.obs} onChange={e=>setModal(p=>({...p,data:{...p.data,obs:e.target.value}}))}/>
            {!!modal.data.historico?.length && <Card style={{ padding:10,background:C.cardBg2 }}>
              <div style={{ fontSize:11,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600,marginBottom:6 }}>Histórico de contato</div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {modal.data.historico.slice().reverse().slice(0,5).map(h=><div key={h.id} style={{ fontSize:12,color:C.textMed }}>{h.data} · {h.acao}</div>)}
              </div>
            </Card>}
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ fontSize:11,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>Templates de contato</div>
              <div style={{ display:"flex",justifyContent:"flex-end" }}>
                <Btn
                  variant="ghost"
                  style={{ padding:"4px 8px",fontSize:11 }}
                  onClick={()=>{
                    const idIgreja = parseInt(modal.data.igrejaId);
                    const baseTpl = getTemplatesIgreja(idIgreja);
                    setModalTemplates({
                      igrejaId:idIgreja,
                      data:{
                        whatsapp:[...(baseTpl.whatsapp||TEMPLATE_PADRAO.whatsapp)],
                        ligacao:[...(baseTpl.ligacao||TEMPLATE_PADRAO.ligacao)],
                      }
                    });
                  }}
                >
                  Configurar templates da igreja
                </Btn>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                <Card style={{ padding:10,background:C.cardBg2 }}>
                  <div style={{ fontSize:12,color:C.textDark,fontWeight:700,marginBottom:8 }}>WhatsApp</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                    {getTemplatesIgreja(parseInt(modal.data.igrejaId)).whatsapp.map((txt,idx)=><Btn key={idx} variant="secondary" style={{ textAlign:"left",padding:"7px 9px",fontSize:11 }} onClick={()=>addHistoricoModal(txt)}>{idx+1}. {txt}</Btn>)}
                  </div>
                </Card>
                <Card style={{ padding:10,background:C.cardBg2 }}>
                  <div style={{ fontSize:12,color:C.textDark,fontWeight:700,marginBottom:8 }}>Ligação</div>
                  <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                    {getTemplatesIgreja(parseInt(modal.data.igrejaId)).ligacao.map((txt,idx)=><Btn key={idx} variant="secondary" style={{ textAlign:"left",padding:"7px 9px",fontSize:11 }} onClick={()=>addHistoricoModal(txt)}>{idx+1}. {txt}</Btn>)}
                  </div>
                </Card>
              </div>
            </div>
            <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modal.data.nome.trim()) return alert("Nome obrigatório"); save(modal.data); }}>Salvar</Btn></div>
          </div>
        </Modal>
      )}
      {modalTemplates && <Modal title={`Templates · ${igrejas.find(ig=>ig.id===modalTemplates.igrejaId)?.nome||"Igreja"}`} onClose={()=>setModalTemplates(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ fontSize:11,color:C.textLight }}>Esses textos serão usados somente para esta igreja.</div>
          <Card style={{ padding:10,background:C.cardBg2 }}>
            <div style={{ fontSize:12,color:C.textDark,fontWeight:700,marginBottom:8 }}>Copiar de outra igreja</div>
            <div style={{ display:"flex",gap:8,alignItems:"end" }}>
              <div style={{ flex:1 }}>
                <Slct
                  label="Origem"
                  value={modalTemplates.origemIgrejaId||""}
                  onChange={e=>setModalTemplates(p=>({...p,origemIgrejaId:e.target.value?parseInt(e.target.value):""}))}
                >
                  <option value="">— Selecionar igreja —</option>
                  {igrejas.filter(ig=>ig.id!==modalTemplates.igrejaId).map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}
                </Slct>
              </div>
              <Btn
                variant="secondary"
                onClick={()=>{
                  const origemId = parseInt(modalTemplates.origemIgrejaId);
                  if(!origemId) return alert("Selecione a igreja de origem.");
                  const tplOrigem = templatesContato?.[origemId] || TEMPLATE_PADRAO;
                  setModalTemplates(p=>({...p,data:{ whatsapp:[...(tplOrigem.whatsapp||TEMPLATE_PADRAO.whatsapp)], ligacao:[...(tplOrigem.ligacao||TEMPLATE_PADRAO.ligacao)] }}));
                }}
              >
                Copiar
              </Btn>
            </div>
          </Card>
          <Card style={{ padding:10,background:C.cardBg2 }}>
            <div style={{ fontSize:12,color:C.textDark,fontWeight:700,marginBottom:8 }}>WhatsApp</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {modalTemplates.data.whatsapp.map((txt,idx)=><Inp key={`w-${idx}`} label={`${idx+1}.`} value={txt} onChange={e=>setModalTemplates(p=>{ const arr=[...p.data.whatsapp]; arr[idx]=e.target.value; return {...p,data:{...p.data,whatsapp:arr}}; })}/>)}
            </div>
          </Card>
          <Card style={{ padding:10,background:C.cardBg2 }}>
            <div style={{ fontSize:12,color:C.textDark,fontWeight:700,marginBottom:8 }}>Ligação</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {modalTemplates.data.ligacao.map((txt,idx)=><Inp key={`l-${idx}`} label={`${idx+1}.`} value={txt} onChange={e=>setModalTemplates(p=>{ const arr=[...p.data.ligacao]; arr[idx]=e.target.value; return {...p,data:{...p.data,ligacao:arr}}; })}/>)}
            </div>
          </Card>
          <div style={{ display:"flex",justifyContent:"space-between",gap:8 }}>
            <Btn variant="ghost" onClick={()=>setModalTemplates(p=>({...p,data:{ whatsapp:[...TEMPLATE_PADRAO.whatsapp], ligacao:[...TEMPLATE_PADRAO.ligacao] }}))}>Restaurar padrão</Btn>
            <div style={{ display:"flex",gap:8 }}>
              <Btn variant="secondary" onClick={()=>setModalTemplates(null)}>Cancelar</Btn>
              <Btn onClick={()=>{
                const w = modalTemplates.data.whatsapp.map(t=>t.trim()).filter(Boolean);
                const l = modalTemplates.data.ligacao.map(t=>t.trim()).filter(Boolean);
                if(w.length<3 || l.length<3) return alert("Preencha os 3 templates de WhatsApp e os 3 de ligação.");
                setTemplatesContato(prev=>({
                  ...(prev||{}),
                  [modalTemplates.igrejaId]:{ whatsapp:w.slice(0,3), ligacao:l.slice(0,3) }
                }));
                setModalTemplates(null);
              }}>Salvar templates</Btn>
            </div>
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// --- MINISTÉRIOS ---------------------------------------------------------------
function Ministerios({ ministerios, setMinisterios, membros, igrejas, igrejaAtual }) {
  const [modal,setModal]=useState(null);
  const [buscaParticipante,setBuscaParticipante]=useState("");
  const [pickerOpen,setPickerOpen]=useState(false);
  const EMPTY={nome:"",lider:"",descricao:"",igrejaId:igrejaAtual||igrejas[0]?.id,participantesIds:[]};
  const base=igrejaAtual?ministerios.filter(m=>m.igrejaId===igrejaAtual):ministerios;
  const save=f=>{ if(modal.mode==="new") setMinisterios(p=>[...p,{...f,id:Date.now()}]); else setMinisterios(p=>p.map(m=>m.id===f.id?f:m)); setModal(null); };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Ministérios</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{base.length} ministérios</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Novo</Btn>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {base.map(min=>{
          const participantesById=membros.filter(m=>(min.participantesIds||[]).includes(m.id)&&m.status==="Ativo");
          const participantesByNome=membros.filter(m=>m.ministerio===min.nome&&m.igrejaId===min.igrejaId&&m.status==="Ativo");
          const mapPart = new Map();
          [...participantesById, ...participantesByNome].forEach(p=>mapPart.set(p.id,p));
          const mbs=[...mapPart.values()];
          const ig=igrejas.find(x=>x.id===min.igrejaId);
          return (
            <Card key={min.id} style={{ padding:14 }}>
              <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8 }}>
                <div><div style={{ color:C.textDark,fontWeight:700,fontSize:14 }}>{min.nome}</div><div style={{ fontSize:11,color:C.textLight }}>Líder: {min.lider||"—"}</div>{!igrejaAtual&&ig&&<div style={{ fontSize:10,color:C.textLight }}>{ig.nome}</div>}</div>
                <RowActions onEdit={()=>{
                  const inferidos=membros
                    .filter(m=>m.ministerio===min.nome&&m.igrejaId===min.igrejaId&&m.status==="Ativo")
                    .map(m=>m.id);
                  const uniq=[...(new Set([...(min.participantesIds||[]),...inferidos]))];
                  setBuscaParticipante("");
                  setPickerOpen(false);
                  setModal({mode:"edit",data:{...min,participantesIds:uniq}});
                }} onDelete={()=>{ if(window.confirm("Remover?")) setMinisterios(p=>p.filter(m=>m.id!==min.id)); }}/>
              </div>
              <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:8,marginTop:4 }}>
                <div style={{ fontSize:11,color:C.textLight,marginBottom:6 }}>{mbs.length} membro(s) ativo(s)</div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                  {mbs.slice(0,8).map(m=><Avatar key={m.id} nome={m.nome} size="sm"/>)}
                  {mbs.length>8&&<div style={{ width:28,height:28,borderRadius:"50%",background:C.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.textLight }}>+{mbs.length-8}</div>}
                </div>
              </div>
            </Card>
          );
        })}
        {!base.length&&<div style={{ textAlign:"center",padding:"48px 0",color:C.textLight,fontSize:13 }}>Nenhum ministério cadastrado.</div>}
      </div>
      {modal && (
        <Modal title={modal.mode==="new"?"Novo Ministério":"Editar Ministério"} onClose={()=>{ setBuscaParticipante(""); setPickerOpen(false); setModal(null); }}>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <Slct label="Igreja *" value={modal.data.igrejaId} onChange={e=>setModal(p=>({...p,data:{...p.data,igrejaId:parseInt(e.target.value)}}))}>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
            <Inp label="Nome *" value={modal.data.nome} onChange={e=>setModal(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
            <Slct label="Líder" value={modal.data.lider} onChange={e=>setModal(p=>({...p,data:{...p.data,lider:e.target.value}}))}><option value="">— Selecionar —</option>{membros.filter(m=>m.status==="Ativo"&&(modal.data.igrejaId?m.igrejaId===parseInt(modal.data.igrejaId):true)).map(m=><option key={m.id}>{m.nome}</option>)}</Slct>
            <div>
              <label style={{ display:"block",fontSize:11,color:C.textLight,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>Participantes</label>
              <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10,display:"flex",flexDirection:"column",gap:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:10 }}>
                  <span style={{ fontSize:12,color:C.textMed }}>{(modal.data.participantesIds||[]).length} participante(s) selecionado(s)</span>
                  <Btn variant="secondary" style={{ padding:"6px 10px",fontSize:12 }} onClick={()=>setPickerOpen(true)}>Selecionar membros</Btn>
                </div>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                  {(modal.data.participantesIds||[]).map(id=>{
                    const membro=membros.find(m=>m.id===id);
                    if(!membro) return null;
                    return <div key={id} style={{ display:"flex",alignItems:"center",gap:6,background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:999,padding:"4px 8px",fontSize:12,color:C.textMed }}>
                      <span>{membro.nome}</span>
                      <button onClick={()=>setModal(p=>({...p,data:{...p.data,participantesIds:(p.data.participantesIds||[]).filter(x=>x!==id)}}))} style={{ border:"none",background:"transparent",cursor:"pointer",fontSize:12,color:C.textLight,padding:0 }}>Excluir</button>
                    </div>;
                  })}
                  {!(modal.data.participantesIds||[]).length && <span style={{ fontSize:12,color:C.textLight }}>Nenhum participante incluído</span>}
                </div>
              </div>
            </div>
            <Txta label="Descrição" value={modal.data.descricao} onChange={e=>setModal(p=>({...p,data:{...p.data,descricao:e.target.value}}))}/>
            <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modal.data.nome.trim()) return alert("Nome obrigatório"); save(modal.data); }}>Salvar</Btn></div>
          </div>
        </Modal>
      )}
      {pickerOpen && modal && <Modal title="Selecionar participantes" onClose={()=>setPickerOpen(false)}>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <input
            value={buscaParticipante}
            onChange={(e)=>setBuscaParticipante(e.target.value)}
            placeholder="Buscar membro..."
            style={{ width:"100%",background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 10px",fontSize:13,color:C.textDark,outline:"none",boxSizing:"border-box",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}
          />
          <div style={{ maxHeight:"52vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:6 }}>
            {membros
              .filter(m=>m.status==="Ativo"&&(modal.data.igrejaId?m.igrejaId===parseInt(modal.data.igrejaId):true))
              .filter(m=>!buscaParticipante || m.nome.toLowerCase().includes(buscaParticipante.toLowerCase()))
              .slice(0,80)
              .map(m=>{
                const incluido=(modal.data.participantesIds||[]).includes(m.id);
                return <div key={m.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,fontSize:13,color:C.textMed,background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px" }}>
                  <span>{m.nome}</span>
                  {!incluido
                    ? <Btn variant="secondary" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setModal(p=>({...p,data:{...p.data,participantesIds:[...(p.data.participantesIds||[]),m.id]}}))}>Incluir</Btn>
                    : <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setModal(p=>({...p,data:{...p.data,participantesIds:(p.data.participantesIds||[]).filter(x=>x!==m.id)}}))}>Excluir</Btn>}
                </div>;
              })}
          </div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:6 }}>
            <Btn variant="secondary" onClick={()=>setPickerOpen(false)}>Concluir</Btn>
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// --- CARGOS --------------------------------------------------------------------
const COR_OPTS=[{v:"bg-purple-700",l:"Roxo"},{v:"bg-blue-700",l:"Azul"},{v:"bg-indigo-700",l:"Índigo"},{v:"bg-teal-700",l:"Verde-azul"},{v:"bg-emerald-700",l:"Verde"},{v:"bg-rose-700",l:"Rosa"},{v:"bg-amber-700",l:"Âmbar"},{v:"bg-zinc-600",l:"Cinza"}];
function Cargos({ cargos, setCargos, membros }) {
  const [modal,setModal]=useState(null);
  const EMPTY={nome:"",nivel:5,descricao:"",cor:"bg-zinc-600"};
  const sorted=[...cargos].sort((a,b)=>a.nivel-b.nivel);
  const ativosTotal=membros.filter(m=>m.status==="Ativo").length;
  const save=f=>{ if(modal.mode==="new") setCargos(p=>[...p,{...f,id:Date.now()}]); else setCargos(p=>p.map(c=>c.id===f.id?f:c)); setModal(null); };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Cargos</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{cargos.length} cargos eclesiásticos</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Novo</Btn>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {sorted.map(cargo=>{
          const count=membros.filter(m=>m.cargo===cargo.nome&&m.status==="Ativo").length;
          return (
            <Card key={cargo.id} style={{ padding:"12px 14px",display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:38,height:38,borderRadius:8,background:COR_DOT[cargo.cor]+"22",border:`1.5px solid ${COR_DOT[cargo.cor]}55`,display:"flex",alignItems:"center",justifyContent:"center",color:COR_DOT[cargo.cor],fontWeight:700,fontSize:12,flexShrink:0 }}>{cargo.nome.slice(0,2).toUpperCase()}</div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ color:C.textDark,fontWeight:700,fontSize:14 }}>{cargo.nome}</div>
                <div style={{ fontSize:11,color:C.textLight }}>{nivelLabel(cargo.nivel)} · {count} membro(s)</div>
              </div>
              <RowActions onEdit={()=>setModal({mode:"edit",data:{...cargo}})} onDelete={()=>{ if(count>0) return alert(`${count} membro(s) com este cargo.`); if(window.confirm("Remover?")) setCargos(p=>p.filter(c=>c.id!==cargo.id)); }}/>
            </Card>
          );
        })}
      </div>
      {modal && <Modal title={modal.mode==="new"?"Novo Cargo":"Editar Cargo"} onClose={()=>setModal(null)}>
        <CargoForm data={modal.data} onSave={save} onClose={()=>setModal(null)}/>
      </Modal>}
    </div>
  );
}
function CargoForm({ data, onSave, onClose }) {
  const [f,setF]=useState(data); const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <Inp label="Nome *" value={f.nome} onChange={e=>s("nome",e.target.value)} placeholder="Ex: Presbítero"/>
      <Txta label="Descrição" value={f.descricao} onChange={e=>s("descricao",e.target.value)}/>
      <Slct label="Nível" value={f.nivel} onChange={e=>s("nivel",parseInt(e.target.value))}>
        <option value={1}>Nível 1 — Ordenado sênior</option><option value={2}>Nível 2 — Ordenado</option><option value={3}>Nível 3 — Comissionado</option><option value={4}>Nível 4 — Designado</option><option value={5}>Nível 5 — Membro</option>
      </Slct>
      <div><label style={{ display:"block",fontSize:11,color:C.textLight,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>Cor</label><div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>{COR_OPTS.map(({v,l})=><button key={v} onClick={()=>s("cor",v)} title={l} style={{ width:32,height:32,borderRadius:6,background:COR_DOT[v],border:f.cor===v?`3px solid ${C.textDark}`:`1px solid ${C.border}`,cursor:"pointer",opacity:f.cor===v?1:0.65 }}>{f.cor===v&&<span style={{color:"white",fontSize:12}}>?</span>}</button>)}</div></div>
      <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={onClose}>Cancelar</Btn><Btn onClick={()=>{ if(!f.nome.trim()) return alert("Nome obrigatório"); onSave(f); }}>Salvar</Btn></div>
    </div>
  );
}

// --- ACESSO --------------------------------------------------------------------
function Acesso({ usuarios, setUsuarios, igrejas, ministerios, perfis, setPerfis }) {
  const [modal,setModal]=useState(null);
  const [perfilModal,setPerfilModal]=useState(null);
  const EMPTY={nome:"",email:"",perfil:perfis[0]?.nome||"Membro",ministerio:"",igrejaId:igrejas[0]?.id||null,ativo:true};
  const EMPTY_PERFIL={nome:"",nivel:5,permissoes:pickPerms(["dashboard"])};
  const perfilMap=useMemo(()=>new Map(perfis.map(p=>[p.nome,p])),[perfis]);
  const perfilPillStyle=(nome)=>{
    const pf=perfilMap.get(nome);
    if(SP[nome]) return SP[nome];
    if(!pf) return SP["Membro"];
    if(pf.nivel<=2) return SP["Lider"];
    if(pf.nivel===3) return SP["Secretaria"];
    return SP["Membro"];
  };
  const save=f=>{ if(modal.mode==="new") setUsuarios(p=>[...p,{...f,id:Date.now()}]); else setUsuarios(p=>p.map(u=>u.id===f.id?f:u)); setModal(null); };
  const savePerfil=(f)=>{
    if(!f.nome?.trim()) return alert("Nome do perfil obrigatório");
    const nivel = nivelValido(f.nivel);
    if(perfilModal.mode==="new"){
      if(perfis.some(p=>p.nome.toLowerCase()===f.nome.toLowerCase())) return alert("Já existe um perfil com este nome");
      setPerfis(p=>[...p,{...f,id:Date.now(),nome:f.nome.trim(),nivel}]);
    } else {
      const nomeAnterior=perfilModal.data.nome;
      if(perfis.some(p=>p.id!==f.id&&p.nome.toLowerCase()===f.nome.toLowerCase())) return alert("Já existe um perfil com este nome");
      setPerfis(p=>p.map(x=>x.id===f.id?{...f,nome:f.nome.trim(),nivel}:x));
      if(nomeAnterior!==f.nome.trim()){
        setUsuarios(p=>p.map(u=>u.perfil===nomeAnterior?{...u,perfil:f.nome.trim()}:u));
      }
    }
    setPerfilModal(null);
  };
  const gruposPerm = [...new Set(FUNCIONALIDADES.map(f=>f.grupo))];
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Acesso</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{usuarios.length} usuários</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Novo</Btn>
      </div>
      <Card style={{ padding:12 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:0 }}>Perfis e permissões</h3>
          <Btn variant="secondary" onClick={()=>setPerfilModal({mode:"new",data:{...EMPTY_PERFIL}})}>+ Novo perfil</Btn>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
          {perfis.map(p=>{
            const qtdPerm=Object.values(p.permissoes||{}).filter(Boolean).length;
            const emUso=usuarios.filter(u=>u.perfil===p.nome).length;
            return <div key={p.id} style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10 }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
                <div>
                  <div style={{ color:C.textDark,fontWeight:700,fontSize:13 }}>{p.nome}</div>
                  <div style={{ fontSize:11,color:C.textLight }}>Nível {p.nivel} · {qtdPerm} funcionalidade(s)</div>
                  <div style={{ fontSize:11,color:C.textLight }}>{emUso} usuário(s) vinculado(s)</div>
                </div>
                <div style={{ display:"flex",gap:6 }}>
                  <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setPerfilModal({mode:"edit",data:{...p,permissoes:{...(p.permissoes||{})}}})}>Editar</Btn>
                  <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>{
                    if(emUso>0) return alert("Existem usuários vinculados a este perfil");
                    if(window.confirm(`Remover perfil "${p.nome}"?`)) setPerfis(prev=>prev.filter(x=>x.id!==p.id));
                  }}>Excluir</Btn>
                </div>
              </div>
            </div>;
          })}
        </div>
      </Card>
      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {usuarios.map(u=>{
          const ig=igrejas.find(x=>x.id===u.igrejaId);
          const pf=perfilMap.get(u.perfil);
          return (
            <Card key={u.id} style={{ padding:"12px 14px",display:"flex",alignItems:"center",gap:12,opacity:u.ativo?1:0.5 }}>
              <Avatar nome={u.nome}/>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}><span style={{ color:C.textDark,fontWeight:700,fontSize:14 }}>{u.nome}</span><Pill label={u.perfil} styleStr={perfilPillStyle(u.perfil)}/></div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>{u.email}{ig?` · ${ig.nome}`:""}{pf?` · Nível ${pf.nivel}`:""}</div>
              </div>
              <div style={{ display:"flex",gap:2 }}>
                <button
                  onClick={()=>setUsuarios(p=>p.map(x=>x.id===u.id?{...x,ativo:!x.ativo}:x))}
                  style={{ background:"transparent",border:`1px solid ${C.border}`,cursor:"pointer",fontSize:11,padding:"4px 8px",borderRadius:999,color:u.ativo?C.emerald:C.amber }}
                  title={u.ativo?"Clique para bloquear":"Clique para liberar"}
                >
                  {u.ativo?"Ativo":"Bloqueado"}
                </button>
                <RowActions onEdit={()=>setModal({mode:"edit",data:{...u}})} onDelete={()=>{ if(window.confirm("Remover?")) setUsuarios(p=>p.filter(x=>x.id!==u.id)); }}/>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && <Modal title={modal.mode==="new"?"Novo Usuário":"Editar Usuário"} onClose={()=>setModal(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Inp label="Nome *" value={modal.data.nome} onChange={e=>setModal(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
          <Inp label="E-mail *" value={modal.data.email} onChange={e=>setModal(p=>({...p,data:{...p.data,email:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Perfil" value={modal.data.perfil} onChange={e=>setModal(p=>({...p,data:{...p.data,perfil:e.target.value}}))}>{perfis.map(x=><option key={x.id} value={x.nome}>{x.nome}</option>)}</Slct>
            <Slct label="Igreja" value={modal.data.igrejaId??""} onChange={e=>setModal(p=>({...p,data:{...p.data,igrejaId:e.target.value?parseInt(e.target.value):null}}))}><option value="">— Todas —</option>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
          </div>
          <Slct label="Ministério" value={modal.data.ministerio} onChange={e=>setModal(p=>({...p,data:{...p.data,ministerio:e.target.value}}))}><option value="">— Nenhum —</option>{ministerios.filter(m=>!modal.data.igrejaId||m.igrejaId===parseInt(modal.data.igrejaId)).map(m=><option key={m.id}>{m.nome}</option>)}</Slct>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modal.data.nome||!modal.data.email) return alert("Nome e e-mail obrigatórios"); save(modal.data); }}>Salvar</Btn></div>
        </div>
      </Modal>}
      {perfilModal && <Modal title={perfilModal.mode==="new"?"Novo Perfil":"Editar Perfil"} onClose={()=>setPerfilModal(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 160px",gap:12 }}>
            <Inp label="Nome do perfil *" value={perfilModal.data.nome} onChange={e=>setPerfilModal(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
            <Inp
              label="Nível de acesso"
              type="number"
              min={1}
              step={1}
              value={perfilModal.data.nivel}
              onChange={e=>setPerfilModal(p=>({...p,data:{...p.data,nivel:e.target.value}}))}
            />
          </div>
          <div>
            <label style={{ display:"block",fontSize:11,color:C.textLight,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600 }}>Permissões por funcionalidade</label>
            <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10,display:"flex",flexDirection:"column",gap:10 }}>
              {gruposPerm.map(g=><div key={g}>
                <div style={{ fontSize:11,color:C.textLight,fontWeight:700,marginBottom:6 }}>{g}</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6 }}>
                  {FUNCIONALIDADES.filter(f=>f.grupo===g).map(f=>{
                    const ok=!!perfilModal.data.permissoes?.[f.key];
                    return <label key={f.key} style={{ display:"flex",alignItems:"center",gap:8,background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 8px",fontSize:12,color:C.textMed }}>
                      <input type="checkbox" checked={ok} onChange={(e)=>setPerfilModal(p=>({...p,data:{...p.data,permissoes:{...(p.data.permissoes||{}),[f.key]:e.target.checked}}}))}/>
                      <span>{f.label}</span>
                    </label>;
                  })}
                </div>
              </div>)}
            </div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",gap:8,paddingTop:6 }}>
            <div style={{ display:"flex",gap:8 }}>
              <Btn variant="ghost" onClick={()=>setPerfilModal(p=>({...p,data:{...p.data,permissoes:allPerms()}}))}>Marcar tudo</Btn>
              <Btn variant="ghost" onClick={()=>setPerfilModal(p=>({...p,data:{...p.data,permissoes:pickPerms(["dashboard"])}}))}>Somente Dashboard</Btn>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <Btn variant="secondary" onClick={()=>setPerfilModal(null)}>Cancelar</Btn>
              <Btn onClick={()=>savePerfil(perfilModal.data)}>Salvar perfil</Btn>
            </div>
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// --- IGREJAS -------------------------------------------------------------------
function Igrejas({ igrejas, setIgrejas, membros, visitantes }) {
  const [modal,setModal]=useState(null); const [detalhe,setDetalhe]=useState(null);
  const EMPTY={nome:"",cidade:"",estado:"SP",endereco:"",pastor:"",telefone:"",email:"",status:"Ativa",foto:""};
  const save=f=>{ if(modal.mode==="new") setIgrejas(p=>[...p,{...f,id:Date.now()}]); else setIgrejas(p=>p.map(ig=>ig.id===f.id?f:ig)); setModal(null); };
  const fotoWrap = {
    width:"100%",
    borderRadius:10,
    overflow:"hidden",
    border:`1px solid ${C.border}`,
    background:"linear-gradient(180deg,#f3f6fb,#e9eef6)",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  };
  const fotoImg = {
    width:"100%",
    height:"100%",
    objectFit:"contain",
    objectPosition:"center",
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Igrejas</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{igrejas.length} unidades</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Nova</Btn>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8 }}>
        <StatCard icon="🏛️" label="Ativas" value={igrejas.filter(ig=>ig.status==="Ativa").length} accent={C.emerald}/>
        <StatCard icon="👥" label="Membros" value={membros.filter(m=>m.status==="Ativo").length} accent={C.oliva}/>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {igrejas.map(ig=>{
          const ativos=membros.filter(m=>m.igrejaId===ig.id&&m.status==="Ativo").length;
          const vis=visitantes.filter(v=>v.igrejaId===ig.id).length;
          const conv=visitantes.filter(v=>v.igrejaId===ig.id&&v.status==="Convertido").length;
          const colLayout=(typeof window!=="undefined"&&window.innerWidth<980)?"1fr":"240px 1fr";
          return (
            <Card key={ig.id} style={{ padding:14 }}>
              <div style={{ display:"grid",gridTemplateColumns:colLayout,gap:12,alignItems:"stretch" }}>
                <div style={{ ...fotoWrap,height:150,cursor:"pointer" }} onClick={()=>setDetalhe(ig)}>
                  {ig.foto
                    ? <img src={ig.foto} alt={`Fachada ${ig.nome}`} style={fotoImg}/>
                    : <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:C.textLight,fontSize:12 }}>Sem foto da fachada</div>}
                </div>
                <div style={{ display:"flex",flexDirection:"column" }}>
                  <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8 }}>
                    <div onClick={()=>setDetalhe(ig)} style={{ cursor:"pointer" }}>
                      <div style={{ color:C.textDark,fontWeight:700,fontSize:15 }}>{ig.nome}</div>
                      <div style={{ fontSize:12,color:C.textLight }}>{ig.cidade}, {ig.estado}</div>
                      <Pill label={ig.status} styleStr={SI[ig.status]||SI["Inativa"]}/>
                    </div>
                    <RowActions onEdit={()=>setModal({mode:"edit",data:{...ig}})} onDelete={()=>{ if(window.confirm(`Remover "${ig.nome}"?`)) setIgrejas(p=>p.filter(x=>x.id!==ig.id)); }}/>
                  </div>
                  <div style={{ fontSize:11,color:C.textLight,marginBottom:10 }}>👤 {ig.pastor}</div>
                  <div style={{ marginTop:"auto",borderTop:`1px solid ${C.border}`,paddingTop:8,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4 }}>
                    {[["👥",ativos,"membros"],["🤝",vis,"visitantes"],["✅",conv,"conv."]].map(([ic,va,lb])=><div key={lb} style={{ textAlign:"center" }}><div style={{ fontSize:16,fontWeight:700,color:C.oliva }}>{va}</div><div style={{ fontSize:10,color:C.textLight }}>{ic} {lb}</div></div>)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && <Modal title={modal.mode==="new"?"Nova Igreja":"Editar Igreja"} onClose={()=>setModal(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Inp label="Nome *" value={modal.data.nome} onChange={e=>setModal(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 80px",gap:12 }}><Inp label="Cidade" value={modal.data.cidade} onChange={e=>setModal(p=>({...p,data:{...p.data,cidade:e.target.value}}))}/><Inp label="Estado" value={modal.data.estado} onChange={e=>setModal(p=>({...p,data:{...p.data,estado:e.target.value}}))}/></div>
          <Inp label="Endereço" value={modal.data.endereco} onChange={e=>setModal(p=>({...p,data:{...p.data,endereco:e.target.value}}))}/>
          <Inp label="Pastor" value={modal.data.pastor} onChange={e=>setModal(p=>({...p,data:{...p.data,pastor:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Inp label="Telefone" value={modal.data.telefone} onChange={e=>setModal(p=>({...p,data:{...p.data,telefone:e.target.value}}))}/><Inp label="E-mail" value={modal.data.email} onChange={e=>setModal(p=>({...p,data:{...p.data,email:e.target.value}}))}/></div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:84,height:64,borderRadius:8,overflow:"hidden",background:"linear-gradient(180deg,#f3f6fb,#e9eef6)",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.textLight,flexShrink:0 }}>
              {modal.data.foto ? <img src={modal.data.foto} alt="Prévia fachada" style={{ width:"100%",height:"100%",objectFit:"contain",objectPosition:"center" }}/> : "Sem foto"}
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              <input
                id="foto-igreja"
                type="file"
                accept="image/*"
                style={{ display:"none" }}
                onChange={(e)=>{
                  const f=e.target.files?.[0];
                  if(!f) return;
                  const r=new FileReader();
                  r.onload=()=>setModal(p=>({...p,data:{...p.data,foto:r.result}}));
                  r.readAsDataURL(f);
                }}
              />
              <Btn variant="secondary" onClick={()=>document.getElementById("foto-igreja")?.click()}>Escolher foto da fachada</Btn>
              {modal.data.foto && <Btn variant="ghost" onClick={()=>setModal(p=>({...p,data:{...p.data,foto:""}}))}>Remover foto</Btn>}
            </div>
          </div>
          <Slct label="Status" value={modal.data.status} onChange={e=>setModal(p=>({...p,data:{...p.data,status:e.target.value}}))}>{["Ativa","Em implantação","Inativa"].map(x=><option key={x}>{x}</option>)}</Slct>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modal.data.nome.trim()) return alert("Nome obrigatório"); save(modal.data); }}>Salvar</Btn></div>
        </div>
      </Modal>}
      {detalhe && <Modal title="Detalhes da Igreja" onClose={()=>setDetalhe(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div style={{ ...fotoWrap,height:220,borderRadius:12 }}>
            {detalhe.foto
              ? <img src={detalhe.foto} alt={`Fachada ${detalhe.nome}`} style={fotoImg}/>
              : <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:C.textLight,fontSize:12 }}>Sem foto da fachada cadastrada</div>}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:46,height:46,borderRadius:10,background:C.olivaLight,border:`1px solid #c8d8b0`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>?</div>
            <div><div style={{ color:C.textDark,fontWeight:700,fontSize:16 }}>{detalhe.nome}</div><Pill label={detalhe.status} styleStr={SI[detalhe.status]||SI["Inativa"]}/></div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            {[["Pastor",detalhe.pastor||"—"],["Endereço",detalhe.endereco||"—"],["Cidade/UF",`${detalhe.cidade}, ${detalhe.estado}`],["Telefone",detalhe.telefone||"—"],["E-mail",detalhe.email||"—"]].map(([k,v])=><div key={k}><div style={{fontSize:10,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:2,fontWeight:600}}>{k}</div><div style={{fontSize:13,color:C.textMed}}>{v}</div></div>)}
          </div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8 }}><Btn variant="secondary" onClick={()=>{ setDetalhe(null); setModal({mode:"edit",data:{...detalhe}}); }}>Editar</Btn><Btn variant="secondary" onClick={()=>setDetalhe(null)}>Fechar</Btn></div>
        </div>
      </Modal>}
    </div>
  );
}

// --- EVENTOS -------------------------------------------------------------------
function Eventos({ eventos, setEventos, igrejas, igrejaAtual, membros, visitantes }) {
  const [modal,setModal]=useState(null);
  const [inscModal,setInscModal]=useState(null);
  const hojeStr = new Date().toISOString().split("T")[0];
  const EMPTY={titulo:"",tipo:"Culto especial",data:hojeStr,local:"",descricao:"",vagas:100,inscricaoPermissao:"Todos",arte:"",igrejaId:igrejaAtual||igrejas[0]?.id,inscritos:[]};
  const base=igrejaAtual?eventos.filter(e=>e.igrejaId===igrejaAtual):eventos;
  const save=(f)=>{ if(modal.mode==="new") setEventos(p=>[...p,{...f,id:Date.now()}]); else setEventos(p=>p.map(e=>e.id===f.id?f:e)); setModal(null); };
  const vagasRestantes=(ev)=>Math.max(0,(parseInt(ev.vagas)||0)-(ev.inscritos?.length||0));
  const totalInscritos=base.reduce((a,e)=>a+(e.inscritos?.length||0),0);
  const baixarArte = (ev) => {
    if(!ev.arte) return;
    const a = document.createElement("a");
    a.href = ev.arte;
    a.download = `arte-${ev.titulo.toLowerCase().replace(/\s+/g,"-")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const compartilharWhatsApp = (ev) => {
    const msg = `${ev.titulo}\n${formatDate(ev.data)} · ${ev.local}\n${ev.descricao||""}`.trim();
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Eventos</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{base.length} eventos</p></div>
        <Btn onClick={()=>setModal({mode:"new",data:{...EMPTY}})}>+ Novo evento</Btn>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8 }}>
        <StatCard icon="📅" label="Próximos" value={base.filter(e=>e.data>=hojeStr).length} accent={C.oliva}/>
        <StatCard icon="🧾" label="Inscrições" value={totalInscritos} accent={C.olivaMed}/>
        <StatCard icon="?" label="Presenças" value={base.reduce((a,e)=>a+(e.inscritos||[]).filter(i=>i.presenca).length,0)} accent={C.emerald}/>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {base.map(ev=>{
          const ig=igrejas.find(x=>x.id===ev.igrejaId);
          const inscritos=ev.inscritos||[];
          const vagas=(parseInt(ev.vagas)||0);
          const pct=vagas?Math.min(100,Math.round((inscritos.length/vagas)*100)):0;
          return <Card key={ev.id} style={{ padding:12 }}>
            {ev.arte && <div style={{ width:"100%",height:170,borderRadius:10,overflow:"hidden",marginBottom:10,border:`1px solid ${C.border}`,background:C.cardBg2 }}>
              <img src={ev.arte} alt={`Arte do evento ${ev.titulo}`} style={{ width:"100%",height:"100%",objectFit:"contain",objectPosition:"center" }}/>
            </div>}
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10 }}>
              <div style={{ minWidth:0 }}>
                <div style={{ display:"flex",alignItems:"center",gap:6,flexWrap:"wrap" }}>
                  <span style={{ color:C.textDark,fontWeight:700,fontSize:15 }}>{ev.titulo}</span>
                  <Pill label={ev.tipo} styleStr={"background:#edf2fb;color:#35507a;border:1px solid #c9d7ee"}/>
                  <Pill label={ev.inscricaoPermissao==="Liderança"?"Somente liderança":"Inscrição aberta"} styleStr={ev.inscricaoPermissao==="Liderança"?"background:#fdf4e0;color:#9a6010;border:1px solid #e8d0a0":"background:#e8f5ee;color:#2d6e45;border:1px solid #b8ddc8"}/>
                </div>
                <div style={{ fontSize:11,color:C.textLight,marginTop:2 }}>{formatDate(ev.data)} · {ev.local}{!igrejaAtual&&ig?` · ${ig.nome}`:""}</div>
                <div style={{ fontSize:12,color:C.textMed,marginTop:6 }}>{ev.descricao||"—"}</div>
              </div>
              <div style={{ display:"flex",gap:2 }}>
                <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>compartilharWhatsApp(ev)}>WhatsApp</Btn>
                <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} disabled={!ev.arte} onClick={()=>baixarArte(ev)}>Baixar arte</Btn>
                <Btn variant="secondary" style={{ padding:"6px 10px",fontSize:11 }} onClick={()=>setInscModal({eventoId:ev.id,busca:"",aba:"Membro",nomeLivre:""})}>Inscrições</Btn>
                <RowActions onEdit={()=>setModal({mode:"edit",data:{...ev}})} onDelete={()=>{ if(window.confirm("Remover evento?")) setEventos(p=>p.filter(x=>x.id!==ev.id)); }}/>
              </div>
            </div>
            <div style={{ marginTop:10 }}>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:C.textLight,marginBottom:4 }}>
                <span>{inscritos.length}/{vagas} inscritos</span>
                <span>{vagasRestantes(ev)} vaga(s) disponível(is)</span>
              </div>
              <Bar pct={pct}/>
            </div>
          </Card>;
        })}
        {!base.length&&<div style={{ textAlign:"center",padding:"48px 0",color:C.textLight,fontSize:13 }}>Nenhum evento cadastrado.</div>}
      </div>
      {modal && <Modal title={modal.mode==="new"?"Novo Evento":"Editar Evento"} onClose={()=>setModal(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Slct label="Igreja" value={modal.data.igrejaId} onChange={e=>setModal(p=>({...p,data:{...p.data,igrejaId:parseInt(e.target.value)}}))}>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
          <Inp label="Título *" value={modal.data.titulo} onChange={e=>setModal(p=>({...p,data:{...p.data,titulo:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Tipo" value={modal.data.tipo} onChange={e=>setModal(p=>({...p,data:{...p.data,tipo:e.target.value}}))}>{["Culto especial","Retiro","Conferência","Batismo","Treinamento","Outro"].map(x=><option key={x}>{x}</option>)}</Slct>
            <Inp label="Data" type="date" value={modal.data.data} onChange={e=>setModal(p=>({...p,data:{...p.data,data:e.target.value}}))}/>
          </div>
          <Slct label="Inscrição permitida para" value={modal.data.inscricaoPermissao||"Todos"} onChange={e=>setModal(p=>({...p,data:{...p.data,inscricaoPermissao:e.target.value}}))}>
            {["Todos","Liderança"].map(x=><option key={x}>{x}</option>)}
          </Slct>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 140px",gap:12 }}>
            <Inp label="Local" value={modal.data.local} onChange={e=>setModal(p=>({...p,data:{...p.data,local:e.target.value}}))}/>
            <Inp label="Vagas" type="number" min={1} value={modal.data.vagas} onChange={e=>setModal(p=>({...p,data:{...p.data,vagas:e.target.value}}))}/>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <div style={{ width:96,height:72,borderRadius:8,overflow:"hidden",background:"linear-gradient(180deg,#f3f6fb,#e9eef6)",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.textLight,flexShrink:0 }}>
              {modal.data.arte ? <img src={modal.data.arte} alt="Prévia arte do evento" style={{ width:"100%",height:"100%",objectFit:"contain",objectPosition:"center" }}/> : "Sem arte"}
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              <input
                id="arte-evento"
                type="file"
                accept="image/*"
                style={{ display:"none" }}
                onChange={(e)=>{
                  const f=e.target.files?.[0];
                  if(!f) return;
                  const r=new FileReader();
                  r.onload=()=>setModal(p=>({...p,data:{...p.data,arte:r.result}}));
                  r.readAsDataURL(f);
                }}
              />
              <Btn variant="secondary" onClick={()=>document.getElementById("arte-evento")?.click()}>Escolher arte</Btn>
              {modal.data.arte && <Btn variant="ghost" onClick={()=>setModal(p=>({...p,data:{...p.data,arte:""}}))}>Remover arte</Btn>}
            </div>
          </div>
          <Txta label="Descrição" value={modal.data.descricao} onChange={e=>setModal(p=>({...p,data:{...p.data,descricao:e.target.value}}))}/>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModal(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modal.data.titulo?.trim()) return alert("Título obrigatório"); save({...modal.data,vagas:parseInt(modal.data.vagas)||0}); }}>Salvar</Btn></div>
        </div>
      </Modal>}
      {inscModal && <Modal title="Inscrições do evento" onClose={()=>setInscModal(null)}>
        {(()=>{
          const ev=eventos.find(e=>e.id===inscModal.eventoId);
          if(!ev) return <div style={{ fontSize:12,color:C.textLight }}>Evento não encontrado.</div>;
          const inscritos=ev.inscritos||[];
          const candidatosRaw = inscModal.aba==="Membro"
            ? membros.filter(m=>m.status==="Ativo"&&(!igrejaAtual||m.igrejaId===ev.igrejaId)).map(m=>({nome:m.nome,tipo:"Membro"}))
            : visitantes.filter(v=>(!igrejaAtual||v.igrejaId===ev.igrejaId)).map(v=>({nome:v.nome,tipo:"Visitante"}));
          const candidatos = candidatosRaw
            .filter(c=>!inscritos.some(i=>i.nome===c.nome&&i.tipo===c.tipo))
            .filter(c=>!inscModal.busca||c.nome.toLowerCase().includes(inscModal.busca.toLowerCase()))
            .slice(0,80);
          return <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ fontSize:12,color:C.textMed,fontWeight:700 }}>{ev.titulo}</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              <Btn variant={inscModal.aba==="Membro"?"primary":"secondary"} onClick={()=>setInscModal(p=>({...p,aba:"Membro"}))}>Membros</Btn>
              <Btn variant={inscModal.aba==="Visitante"?"primary":"secondary"} onClick={()=>setInscModal(p=>({...p,aba:"Visitante"}))}>Visitantes</Btn>
            </div>
            <Inp label={`Buscar ${inscModal.aba.toLowerCase()}`} value={inscModal.busca} onChange={e=>setInscModal(p=>({...p,busca:e.target.value}))}/>
            <div style={{ maxHeight:"26vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:6 }}>
              {candidatos.map(c=><div key={`${c.tipo}-${c.nome}`} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px" }}>
                <span style={{ fontSize:12,color:C.textMed }}>{c.nome}</span>
                <Btn variant="secondary" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>{
                  if((ev.inscritos||[]).length>=(parseInt(ev.vagas)||0)) return alert("Vagas esgotadas.");
                  setEventos(p=>p.map(x=>x.id!==ev.id?x:{...x,inscritos:[...(x.inscritos||[]),{id:Date.now(),nome:c.nome,tipo:c.tipo,presenca:false,dataInscricao:hojeStr}]}));
                }}>Inscrever</Btn>
              </div>)}
              {!candidatos.length&&<div style={{ fontSize:11,color:C.textLight,textAlign:"center",padding:"8px 0" }}>Sem candidatos disponíveis</div>}
            </div>
            <Card style={{ padding:10,background:C.cardBg2 }}>
              <div style={{ fontSize:11,color:C.textLight,textTransform:"uppercase",letterSpacing:"0.5px",fontWeight:600,marginBottom:8 }}>Inscritos ({inscritos.length})</div>
              <div style={{ maxHeight:"24vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:6 }}>
                {inscritos.map(i=><div key={i.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,fontSize:12,color:C.textMed,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",background:C.cardBg }}>
                  <div>{i.nome} · {i.tipo}</div>
                  <div style={{ display:"flex",gap:6 }}>
                    <Btn variant={i.presenca?"primary":"secondary"} style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setEventos(p=>p.map(x=>x.id!==ev.id?x:{...x,inscritos:(x.inscritos||[]).map(it=>it.id===i.id?{...it,presenca:!it.presenca}:it)}))}>{i.presenca?"Presente":"Confirmar"}</Btn>
                    <Btn variant="ghost" style={{ padding:"4px 8px",fontSize:11 }} onClick={()=>setEventos(p=>p.map(x=>x.id!==ev.id?x:{...x,inscritos:(x.inscritos||[]).filter(it=>it.id!==i.id)}))}>Remover</Btn>
                  </div>
                </div>)}
              </div>
            </Card>
            <div style={{ display:"flex",justifyContent:"space-between",gap:8 }}>
              <Btn variant="ghost" onClick={()=>{
                const rows = [
                  ["Evento","Data","Nome","Tipo","Presença","Data inscrição"],
                  ...inscritos.map(i=>[ev.titulo,ev.data,i.nome,i.tipo,i.presenca?"Sim":"Não",i.dataInscricao]),
                ];
                downloadCsv(`inscricoes-${ev.titulo.toLowerCase().replace(/\s+/g,"-")}.csv`, rows);
              }}>Exportar CSV</Btn>
              <Btn variant="secondary" onClick={()=>setInscModal(null)}>Fechar</Btn>
            </div>
          </div>;
        })()}
      </Modal>}
    </div>
  );
}

// --- COMUNICAÇÃO ---------------------------------------------------------------
function Comunicacao({ comunicados, setComunicados, pedidosOracao, setPedidosOracao, igrejas, ministerios, igrejaAtual }) {
  const [modalAviso,setModalAviso]=useState(null);
  const [modalPedido,setModalPedido]=useState(null);
  const hojeStr = new Date().toISOString().split("T")[0];
  const [periodoIni,setPeriodoIni]=useState(hojeStr.slice(0,8)+"01");
  const [periodoFim,setPeriodoFim]=useState(hojeStr);
  const noPeriodo = (d) => (!periodoIni || d>=periodoIni) && (!periodoFim || d<=periodoFim);
  const baseAvisos=(igrejaAtual?comunicados.filter(c=>c.igrejaId===igrejaAtual||c.igrejaId===null):comunicados).filter(c=>noPeriodo(c.data));
  const basePedidos=(igrejaAtual?pedidosOracao.filter(p=>p.igrejaId===igrejaAtual):pedidosOracao).filter(p=>noPeriodo(p.data));
  const EMPTY_AVISO={igrejaId:igrejaAtual||"",titulo:"",mensagem:"",segmento:"Todos",ministerio:"",data:hojeStr};
  const EMPTY_PEDIDO={igrejaId:igrejaAtual||igrejas[0]?.id,nome:"",origem:"Membro",pedido:"",status:"Novo",responsavel:"",data:hojeStr};
  const saveAviso=(f)=>{ if(modalAviso.mode==="new") setComunicados(p=>[...p,{...f,id:Date.now(),igrejaId:f.igrejaId?parseInt(f.igrejaId):null}]); else setComunicados(p=>p.map(c=>c.id===f.id?{...f,igrejaId:f.igrejaId?parseInt(f.igrejaId):null}:c)); setModalAviso(null); };
  const savePedido=(f)=>{ if(modalPedido.mode==="new") setPedidosOracao(p=>[...p,{...f,id:Date.now(),igrejaId:parseInt(f.igrejaId)}]); else setPedidosOracao(p=>p.map(c=>c.id===f.id?{...f,igrejaId:parseInt(f.igrejaId)}:c)); setModalPedido(null); };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
        <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Comunicação</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{baseAvisos.length} avisos · {basePedidos.length} pedidos de oração</p></div>
        <div style={{ display:"flex",gap:8 }}>
          <Btn variant="secondary" onClick={()=>setModalPedido({mode:"new",data:{...EMPTY_PEDIDO}})}>+ Pedido oração</Btn>
          <Btn onClick={()=>setModalAviso({mode:"new",data:{...EMPTY_AVISO}})}>+ Aviso</Btn>
        </div>
      </div>
      <Card style={{ padding:10 }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,alignItems:"end" }}>
          <Inp label="Período inicial" type="date" value={periodoIni} onChange={e=>setPeriodoIni(e.target.value)}/>
          <Inp label="Período final" type="date" value={periodoFim} onChange={e=>setPeriodoFim(e.target.value)}/>
          <Btn variant="ghost" onClick={()=>{ setPeriodoIni(""); setPeriodoFim(""); }}>Limpar</Btn>
        </div>
      </Card>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
        <Card style={{ padding:12 }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
            <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:0 }}>Avisos segmentados</h3>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {baseAvisos.map(a=><div key={a.id} style={{ border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 10px",background:C.cardBg2 }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:13,color:C.textDark,fontWeight:700 }}>{a.titulo}</div>
                  <div style={{ fontSize:11,color:C.textLight }}>{a.segmento}{a.ministerio?` · ${a.ministerio}`:""} · {formatDate(a.data)}</div>
                </div>
                <RowActions onEdit={()=>setModalAviso({mode:"edit",data:{...a,igrejaId:a.igrejaId??""}})} onDelete={()=>{ if(window.confirm("Remover aviso?")) setComunicados(p=>p.filter(x=>x.id!==a.id)); }}/>
              </div>
              <div style={{ fontSize:12,color:C.textMed,marginTop:4 }}>{a.mensagem}</div>
            </div>)}
            {!baseAvisos.length&&<div style={{ fontSize:12,color:C.textLight,textAlign:"center",padding:"14px 0" }}>Nenhum aviso cadastrado.</div>}
          </div>
        </Card>
        <Card style={{ padding:12 }}>
          <h3 style={{ color:C.textDark,fontSize:13,fontWeight:700,margin:"0 0 8px" }}>Painel de pedidos de oração</h3>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            {basePedidos.map(ped=><div key={ped.id} style={{ border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 10px",background:C.cardBg2 }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
                <div>
                  <div style={{ fontSize:13,color:C.textDark,fontWeight:700 }}>{ped.nome} <span style={{ fontSize:11,color:C.textLight,fontWeight:400 }}>({ped.origem})</span></div>
                  <div style={{ fontSize:11,color:C.textLight }}>{formatDate(ped.data)} · Resp.: {ped.responsavel||"—"}</div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <Slct label="" value={ped.status} onChange={e=>setPedidosOracao(prev=>prev.map(x=>x.id===ped.id?{...x,status:e.target.value}:x))}>
                    {["Novo","Em acompanhamento","Concluído"].map(s=><option key={s}>{s}</option>)}
                  </Slct>
                  <RowActions onEdit={()=>setModalPedido({mode:"edit",data:{...ped}})} onDelete={()=>{ if(window.confirm("Remover pedido?")) setPedidosOracao(prev=>prev.filter(x=>x.id!==ped.id)); }}/>
                </div>
              </div>
              <div style={{ fontSize:12,color:C.textMed,marginTop:4 }}>{ped.pedido}</div>
            </div>)}
            {!basePedidos.length&&<div style={{ fontSize:12,color:C.textLight,textAlign:"center",padding:"14px 0" }}>Nenhum pedido registrado.</div>}
          </div>
        </Card>
      </div>
      {modalAviso && <Modal title={modalAviso.mode==="new"?"Novo Aviso":"Editar Aviso"} onClose={()=>setModalAviso(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Inp label="Título *" value={modalAviso.data.titulo} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,titulo:e.target.value}}))}/>
          <Txta label="Mensagem *" value={modalAviso.data.mensagem} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,mensagem:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Segmento" value={modalAviso.data.segmento} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,segmento:e.target.value}}))}>{["Todos","Ministério","Liderança","Visitantes"].map(x=><option key={x}>{x}</option>)}</Slct>
            <Inp label="Data" type="date" value={modalAviso.data.data} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,data:e.target.value}}))}/>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Igreja alvo" value={modalAviso.data.igrejaId??""} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,igrejaId:e.target.value}}))}><option value="">— Rede inteira —</option>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
            <Slct label="Ministério (opcional)" value={modalAviso.data.ministerio||""} onChange={e=>setModalAviso(p=>({...p,data:{...p.data,ministerio:e.target.value}}))}><option value="">— Nenhum —</option>{ministerios.filter(m=>!modalAviso.data.igrejaId||m.igrejaId===parseInt(modalAviso.data.igrejaId)).map(m=><option key={m.id}>{m.nome}</option>)}</Slct>
          </div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModalAviso(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modalAviso.data.titulo?.trim()||!modalAviso.data.mensagem?.trim()) return alert("Título e mensagem são obrigatórios"); saveAviso(modalAviso.data); }}>Salvar</Btn></div>
        </div>
      </Modal>}
      {modalPedido && <Modal title={modalPedido.mode==="new"?"Novo Pedido de Oração":"Editar Pedido de Oração"} onClose={()=>setModalPedido(null)}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Igreja" value={modalPedido.data.igrejaId} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,igrejaId:e.target.value}}))}>{igrejas.map(ig=><option key={ig.id} value={ig.id}>{ig.nome}</option>)}</Slct>
            <Slct label="Origem" value={modalPedido.data.origem} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,origem:e.target.value}}))}>{["Membro","Visitante","Anônimo"].map(x=><option key={x}>{x}</option>)}</Slct>
          </div>
          <Inp label="Nome" value={modalPedido.data.nome} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,nome:e.target.value}}))}/>
          <Txta label="Pedido *" value={modalPedido.data.pedido} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,pedido:e.target.value}}))}/>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
            <Slct label="Status" value={modalPedido.data.status} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,status:e.target.value}}))}>{["Novo","Em acompanhamento","Concluído"].map(x=><option key={x}>{x}</option>)}</Slct>
            <Inp label="Responsável" value={modalPedido.data.responsavel} onChange={e=>setModalPedido(p=>({...p,data:{...p.data,responsavel:e.target.value}}))}/>
          </div>
          <div style={{ display:"flex",justifyContent:"flex-end",gap:8,paddingTop:8 }}><Btn variant="secondary" onClick={()=>setModalPedido(null)}>Cancelar</Btn><Btn onClick={()=>{ if(!modalPedido.data.pedido?.trim()) return alert("Pedido obrigatório"); savePedido(modalPedido.data); }}>Salvar</Btn></div>
        </div>
      </Modal>}
    </div>
  );
}

// --- RELATÓRIOS ----------------------------------------------------------------
function Relatorios({ membros, visitantes, ministerios, igrejas, cargos, igrejaAtual, eventos, comunicados, pedidosOracao }) {
  const sc=arr=>igrejaAtual?arr.filter(x=>x.igrejaId===igrejaAtual):arr;
  const MESES=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const mes=hoje.getMonth();
  const ativosTotal=sc(membros).filter(m=>m.status==="Ativo").length;
  const aniv=sc(membros).filter(m=>m.nascimento&&parseInt(m.nascimento.split("-")[1])-1===mes).sort((a,b)=>parseInt(a.nascimento.split("-")[2])-parseInt(b.nascimento.split("-")[2]));
  const semMin=sc(membros).filter(m=>!m.ministerio&&m.status==="Ativo");
  const evBase=sc(eventos||[]);
  const totalInsc=evBase.reduce((a,e)=>a+(e.inscritos||[]).length,0);
  const totalPres=evBase.reduce((a,e)=>a+(e.inscritos||[]).filter(i=>i.presenca).length,0);
  const taxaPresenca=totalInsc?Math.round((totalPres/totalInsc)*100):0;
  const avisosBase=igrejaAtual?(comunicados||[]).filter(c=>c.igrejaId===igrejaAtual||c.igrejaId===null):(comunicados||[]);
  const pedidosBase=sc(pedidosOracao||[]);
  const pedidosAbertos=pedidosBase.filter(p=>p.status!=="Concluído").length;
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
      <div><h2 style={{ color:C.textDark,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",fontSize:18,margin:0,fontWeight:700 }}>Relatórios</h2><p style={{ color:C.textLight,fontSize:12,margin:0 }}>{igrejaAtual?igrejas.find(ig=>ig.id===igrejaAtual)?.nome:"Rede completa"}</p></div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10 }}>
        <StatCard icon="?" label="Membros ativos" value={ativosTotal} accent={C.emerald}/>
        <StatCard icon="⚠️" label="Inativos" value={sc(membros).filter(m=>m.status!=="Ativo").length} accent={C.amber}/>
        <StatCard icon="🙌" label="Convertidos" value={sc(visitantes).filter(v=>v.status==="Convertido").length} accent={C.oliva}/>
        <StatCard icon="📞" label="Aguardando" value={sc(visitantes).filter(v=>v.status==="Aguardando retorno").length} accent={C.bege}/>
      </div>
      <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 12px",fontWeight:700 }}>Engajamento</h3>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
          <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10 }}><div style={{ fontSize:20,fontWeight:700,color:C.oliva }}>{evBase.length}</div><div style={{ fontSize:11,color:C.textLight }}>Eventos</div></div>
          <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10 }}><div style={{ fontSize:20,fontWeight:700,color:C.olivaMed }}>{totalInsc}</div><div style={{ fontSize:11,color:C.textLight }}>Inscrições</div></div>
          <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10 }}><div style={{ fontSize:20,fontWeight:700,color:C.emerald }}>{taxaPresenca}%</div><div style={{ fontSize:11,color:C.textLight }}>Taxa presença</div></div>
          <div style={{ background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:10,padding:10 }}><div style={{ fontSize:20,fontWeight:700,color:C.amber }}>{pedidosAbertos}</div><div style={{ fontSize:11,color:C.textLight }}>Pedidos em aberto</div></div>
        </div>
        <div style={{ marginTop:8,fontSize:11,color:C.textLight }}>{avisosBase.length} aviso(s) publicado(s) no período atual de operação.</div>
      </Card>
      {!igrejaAtual && <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 12px",fontWeight:700 }}>Por Igreja</h3>
        {igrejas.map(ig=>{
          const at=membros.filter(m=>m.igrejaId===ig.id&&m.status==="Ativo").length;
          const mx=Math.max(...igrejas.map(x=>membros.filter(m=>m.igrejaId===x.id&&m.status==="Ativo").length),1);
          return <div key={ig.id} style={{ marginBottom:10 }}><div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3 }}><span style={{ color:C.textMed }}>{ig.nome}</span><span style={{ color:C.textLight }}>{at} membros</span></div><Bar pct={Math.round((at/mx)*100)}/></div>;
        })}
      </Card>}
      <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 12px",fontWeight:700 }}>Aniversariantes de {MESES[mes]}</h3>
        {aniv.length>0 ? aniv.map(m=><div key={m.id} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}><Avatar nome={m.nome}/><div><div style={{ fontSize:13,color:C.textMed,fontWeight:600 }}>{m.nome}</div><div style={{ fontSize:11,color:C.textLight }}>{formatDate(m.nascimento)}{!igrejaAtual?` · ${igrejas.find(ig=>ig.id===m.igrejaId)?.nome}`:""}</div></div><span style={{ fontSize:11,color:C.textLight,marginLeft:"auto" }}>{m.telefone}</span></div>) : <p style={{ fontSize:12,color:C.textLight }}>Nenhum aniversariante neste mês.</p>}
      </Card>
      {semMin.length>0 && <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 10px",fontWeight:700 }}>Sem ministério ({semMin.length})</h3>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>{semMin.map(m=><div key={m.id} style={{ display:"flex",alignItems:"center",gap:6,background:C.cardBg2,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 10px" }}><Avatar nome={m.nome} size="sm"/><span style={{ fontSize:12,color:C.textMed }}>{m.nome}</span></div>)}</div>
      </Card>}
      <Card style={{ padding:14 }}>
        <h3 style={{ color:C.textDark,fontSize:13,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",margin:"0 0 12px",fontWeight:700 }}>Funil de Visitantes</h3>
        {["Aguardando retorno","Contatado","Retornou","Convertido"].map(st=>{
          const count=sc(visitantes).filter(v=>v.status===st).length;
          const total=sc(visitantes).length;
          const pct=total>0?Math.round((count/total)*100):0;
          return <div key={st} style={{ marginBottom:10 }}><div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}><Pill label={st} styleStr={SV[st]||""}/><span style={{ fontSize:11,color:C.textLight }}>{count} ({pct}%)</span></div><Bar pct={pct}/></div>;
        })}
      </Card>
    </div>
  );
}

// --- APP ROOT ------------------------------------------------------------------
const PAGE_LABELS = { dashboard:"Dashboard",igrejas:"Igrejas",membros:"Membros",visitantes:"Visitantes",ministerios:"Ministérios",eventos:"Eventos",comunicacao:"Comunicação",cargos:"Cargos",acesso:"Acesso",relatorios:"Relatórios" };
const PAGE_ICONS = { dashboard:"📊",igrejas:"🏛️",membros:"👥",visitantes:"🤝",ministerios:"⛪",eventos:"📅",comunicacao:"📣",cargos:"🎖️",acesso:"🔐",relatorios:"📋" };

export default function App() {
  const isMobile = useIsMobile();
  const [pagina,setPagina]=useState("dashboard");
  const [drawerOpen,setDrawerOpen]=useState(false);
  const [igrejaAtual,setIgrejaAtual]=usePersistentState("secap_igreja_atual", null);
  const [igrejas,setIgrejas]=usePersistentState("secap_igrejas", IGREJAS_INIT);
  const [membros,setMembros]=usePersistentState("secap_membros", MEMBROS_INIT);
  const [visitantes,setVisitantes]=usePersistentState("secap_visitantes", VISITANTES_INIT);
  const [eventos,setEventos]=usePersistentState("secap_eventos", EVENTOS_INIT);
  const [comunicados,setComunicados]=usePersistentState("secap_comunicados", COMUNICADOS_INIT);
  const [pedidosOracao,setPedidosOracao]=usePersistentState("secap_pedidos_oracao", PEDIDOS_ORACAO_INIT);
  const [templatesContato,setTemplatesContato]=usePersistentState("secap_templates_contato", {});
  const [ministerios,setMinisterios]=usePersistentState("secap_ministerios", MINISTERIOS_INIT);
  const [usuarios,setUsuarios]=usePersistentState("secap_usuarios", USUARIOS_INIT);
  const [perfis,setPerfis]=usePersistentState("secap_perfis", PERFIS_INIT);
  const [cargos,setCargos]=usePersistentState("secap_cargos", CARGOS_INIT);
  const [perfilAtualNome,setPerfilAtualNome]=usePersistentState("secap_perfil_atual", "Admin");
  const [membroAtualId,setMembroAtualId]=usePersistentState("secap_membro_atual_id", null);
  const [syncStatus,setSyncStatus]=useState("local");
  const isHydratingRef = useRef(true);
  const saveTimerRef = useRef(null);
  const perfilAtual = useMemo(()=>perfis.find(p=>p.nome===perfilAtualNome)||perfis[0], [perfis,perfilAtualNome]);
  const membrosAtivosContexto = useMemo(
    ()=>membros.filter(m=>m.status==="Ativo" && (!igrejaAtual || m.igrejaId===igrejaAtual)),
    [membros,igrejaAtual]
  );
  const membroAtual = useMemo(
    ()=>membros.find(m=>m.id===membroAtualId) || membrosAtivosContexto[0] || null,
    [membros,membroAtualId,membrosAtivosContexto]
  );
  const pageToPerm = {
    dashboard:"dashboard",
    igrejas:"igrejas",
    membros:"membros",
    visitantes:"visitantes",
    ministerios:"ministerios",
    eventos:"eventos",
    comunicacao:"comunicacao",
    cargos:"cargos",
    acesso:"acesso",
    relatorios:"relatorios",
  };
  const canAccess = (pageId) => !!perfilAtual?.permissoes?.[pageToPerm[pageId]];
  const allowedPages = Object.keys(pageToPerm).filter(canAccess);

  const nav = (id) => { if(canAccess(id)){ setPagina(id); setDrawerOpen(false); } };
  const igNome = igrejaAtual ? igrejas.find(ig=>ig.id===igrejaAtual)?.nome : "Todas as igrejas";

  useEffect(()=>{
    if(!allowedPages.includes(pagina)) setPagina("dashboard");
  }, [pagina, allowedPages]);
  useEffect(()=>{
    if(perfilAtualNome==="Membro" && !membroAtualId && membrosAtivosContexto[0]) setMembroAtualId(membrosAtivosContexto[0].id);
    if(perfilAtualNome==="Membro" && membroAtualId && !membros.some(m=>m.id===membroAtualId&&m.status==="Ativo")) setMembroAtualId(membrosAtivosContexto[0]?.id||null);
  }, [perfilAtualNome,membroAtualId,membros,membrosAtivosContexto]);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setSyncStatus("carregando");
        const remote = await apiGetState();
        if (!active) return;
        const st = remote?.state;
        if (st && typeof st === "object") {
          if ("igrejaAtual" in st) setIgrejaAtual(st.igrejaAtual);
          if ("igrejas" in st) setIgrejas(st.igrejas || IGREJAS_INIT);
          if ("membros" in st) setMembros(st.membros || MEMBROS_INIT);
          if ("visitantes" in st) setVisitantes(st.visitantes || VISITANTES_INIT);
          if ("eventos" in st) setEventos(st.eventos || EVENTOS_INIT);
          if ("comunicados" in st) setComunicados(st.comunicados || COMUNICADOS_INIT);
          if ("pedidosOracao" in st) setPedidosOracao(st.pedidosOracao || PEDIDOS_ORACAO_INIT);
          if ("templatesContato" in st) setTemplatesContato(st.templatesContato || {});
          if ("ministerios" in st) setMinisterios(st.ministerios || MINISTERIOS_INIT);
          if ("usuarios" in st) setUsuarios(st.usuarios || USUARIOS_INIT);
          if ("perfis" in st) setPerfis(st.perfis || PERFIS_INIT);
          if ("cargos" in st) setCargos(st.cargos || CARGOS_INIT);
          if ("perfilAtualNome" in st) setPerfilAtualNome(st.perfilAtualNome || "Admin");
          if ("membroAtualId" in st) setMembroAtualId(st.membroAtualId ?? null);
        }
        setSyncStatus("online");
      } catch {
        setSyncStatus("local");
      } finally {
        isHydratingRef.current = false;
      }
    })();
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (isHydratingRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    const snapshot = { igrejaAtual, igrejas, membros, visitantes, eventos, comunicados, pedidosOracao, templatesContato, ministerios, usuarios, perfis, cargos, perfilAtualNome, membroAtualId };
    saveTimerRef.current = setTimeout(async () => {
      try {
        setSyncStatus("salvando");
        await apiPutState(snapshot);
        setSyncStatus("online");
      } catch {
        setSyncStatus("erro");
      }
    }, 700);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [igrejaAtual, igrejas, membros, visitantes, eventos, comunicados, pedidosOracao, templatesContato, ministerios, usuarios, perfis, cargos, perfilAtualNome, membroAtualId]);

  const renderPage = () => {
    if (pagina==="dashboard") {
      if(perfilAtualNome==="Membro") return <MembroInicio igrejaAtual={igrejaAtual} igrejas={igrejas} eventos={eventos} comunicados={comunicados} pedidosOracao={pedidosOracao} membroAtual={membroAtual} setEventos={setEventos} setPedidosOracao={setPedidosOracao}/>;
      return <Dashboard igrejas={igrejas} membros={membros} visitantes={visitantes} ministerios={ministerios} igrejaAtual={igrejaAtual}/>;
    }
    if (pagina==="igrejas")     return <Igrejas igrejas={igrejas} setIgrejas={setIgrejas} membros={membros} visitantes={visitantes}/>;
    if (pagina==="membros")     return <Membros membros={membros} setMembros={setMembros} ministerios={ministerios} igrejas={igrejas} cargos={cargos} igrejaAtual={igrejaAtual}/>;
    if (pagina==="visitantes")  return <Visitantes visitantes={visitantes} setVisitantes={setVisitantes} setMembros={setMembros} igrejas={igrejas} igrejaAtual={igrejaAtual} templatesContato={templatesContato} setTemplatesContato={setTemplatesContato}/>;
    if (pagina==="eventos")     return <Eventos eventos={eventos} setEventos={setEventos} igrejas={igrejas} igrejaAtual={igrejaAtual} membros={membros} visitantes={visitantes}/>;
    if (pagina==="comunicacao") return <Comunicacao comunicados={comunicados} setComunicados={setComunicados} pedidosOracao={pedidosOracao} setPedidosOracao={setPedidosOracao} igrejas={igrejas} ministerios={ministerios} igrejaAtual={igrejaAtual}/>;
    if (pagina==="ministerios") return <Ministerios ministerios={ministerios} setMinisterios={setMinisterios} membros={membros} igrejas={igrejas} igrejaAtual={igrejaAtual}/>;
    if (pagina==="cargos")      return <Cargos cargos={cargos} setCargos={setCargos} membros={membros}/>;
    if (pagina==="acesso")      return <Acesso usuarios={usuarios} setUsuarios={setUsuarios} igrejas={igrejas} ministerios={ministerios} perfis={perfis} setPerfis={setPerfis}/>;
    if (pagina==="relatorios")  return <Relatorios membros={membros} visitantes={visitantes} ministerios={ministerios} igrejas={igrejas} cargos={cargos} igrejaAtual={igrejaAtual} eventos={eventos} comunicados={comunicados} pedidosOracao={pedidosOracao}/>;
    return null;
  };
  const exportarBackup = () => {
    const payload = {
      meta:{ app:"SECAP", version:"2.0", exportedAt:new Date().toISOString() },
      igrejaAtual, igrejas, membros, visitantes, eventos, comunicados, pedidosOracao, templatesContato, ministerios, usuarios, perfis, cargos, perfilAtualNome, membroAtualId
    };
    const blob = new Blob([JSON.stringify(payload,null,2)], { type:"application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-secap-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const resetarDados = () => {
    if(!window.confirm("Deseja resetar todos os dados do sistema local?")) return;
    setIgrejaAtual(null);
    setIgrejas(IGREJAS_INIT);
    setMembros(MEMBROS_INIT);
    setVisitantes(VISITANTES_INIT);
    setEventos(EVENTOS_INIT);
    setComunicados(COMUNICADOS_INIT);
    setPedidosOracao(PEDIDOS_ORACAO_INIT);
    setTemplatesContato({});
    setMinisterios(MINISTERIOS_INIT);
    setUsuarios(USUARIOS_INIT);
    setPerfis(PERFIS_INIT);
    setCargos(CARGOS_INIT);
    setPerfilAtualNome("Admin");
    setMembroAtualId(null);
    setPagina("dashboard");
  };
  const syncLabel = {
    online:"API online",
    salvando:"Salvando...",
    carregando:"Carregando...",
    erro:"Erro API",
    local:"Modo local"
  }[syncStatus] || "Modo local";

  return (
    <div style={{ minHeight:"100vh",background:C.pageBg,color:C.textDark,display:"flex",fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>

      {/* MOBILE: Drawer lateral + Bottom Nav */}
      {isMobile && <>
        <Drawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} igrejas={igrejas} igrejaAtual={igrejaAtual} setIgrejaAtual={setIgrejaAtual} pagina={pagina} nav={nav} allowedPages={allowedPages}/>
        <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
          {/* Mobile Header */}
          <header style={{ background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:20,boxShadow:"0 1px 6px rgba(40,30,10,0.07)" }}>
            <button onClick={()=>setDrawerOpen(true)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:22,padding:"2px 6px",color:C.oliva }}>?</button>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:13,fontWeight:700,color:C.textDark }}>{PAGE_ICONS[pagina]} {PAGE_LABELS[pagina]}</div>
              <div style={{ fontSize:10,color:C.oliva,fontWeight:600 }}>{igNome}</div>
              <div style={{ fontSize:9,color:C.textLight }}>{syncLabel}</div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
              <select value={perfilAtualNome} onChange={e=>setPerfilAtualNome(e.target.value)} style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 6px",fontSize:11,color:C.textMed,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
                {perfis.map(p=><option key={p.id} value={p.nome}>{p.nome}</option>)}
              </select>
              {perfilAtualNome==="Membro" && <select value={membroAtual?.id||""} onChange={e=>setMembroAtualId(parseInt(e.target.value))} style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 6px",fontSize:10,color:C.textMed,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
                {membrosAtivosContexto.map(m=><option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>}
            </div>
          </header>
          {/* Mobile Content */}
          <main style={{ flex:1,padding:"16px 14px",overflowY:"auto",paddingBottom:80 }}>
            {renderPage()}
          </main>
          <BottomNav pagina={pagina} nav={nav} onMaisClick={()=>setDrawerOpen(true)} allowedPages={allowedPages}/>
        </div>
      </>}

      {/* DESKTOP: Sidebar fixa + conteúdo */}
      {!isMobile && <>
        <Sidebar pagina={pagina} nav={nav} igrejas={igrejas} igrejaAtual={igrejaAtual} setIgrejaAtual={setIgrejaAtual} allowedPages={allowedPages}/>
        <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
          <header style={{ background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"11px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10,boxShadow:"0 1px 4px rgba(40,30,10,0.06)" }}>
            <div style={{ fontSize:12,color:C.textLight }}>{PAGE_ICONS[pagina]} <span style={{ color:C.textMed,fontWeight:600 }}>{PAGE_LABELS[pagina]}</span><span style={{ margin:"0 8px",color:C.border }}>·</span><span style={{ color:C.oliva,fontWeight:600 }}>{igNome}</span><span style={{ margin:"0 8px",color:C.border }}>·</span><span style={{ color:C.textLight }}>{syncLabel}</span></div>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <Btn variant="ghost" style={{ padding:"5px 8px",fontSize:11 }} onClick={exportarBackup}>Backup</Btn>
              <Btn variant="ghost" style={{ padding:"5px 8px",fontSize:11,color:C.red }} onClick={resetarDados}>Reset</Btn>
              <div style={{ width:30,height:30,borderRadius:"50%",background:C.oliva,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff" }}>P</div>
              <select value={perfilAtualNome} onChange={e=>setPerfilAtualNome(e.target.value)} style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 8px",fontSize:12,color:C.textMed,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif" }}>
                {perfis.map(p=><option key={p.id} value={p.nome}>{p.nome}</option>)}
              </select>
              {perfilAtualNome==="Membro" && <select value={membroAtual?.id||""} onChange={e=>setMembroAtualId(parseInt(e.target.value))} style={{ background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 8px",fontSize:12,color:C.textMed,fontFamily:"Manrope, \"Segoe UI\", \"Helvetica Neue\", sans-serif",maxWidth:220 }}>
                {membrosAtivosContexto.map(m=><option key={m.id} value={m.id}>{m.nome}</option>)}
              </select>}
            </div>
          </header>
          <main style={{ flex:1,padding:"20px 24px",overflowY:"auto" }}>
            {renderPage()}
          </main>
        </div>
      </>}

    </div>
  );
}






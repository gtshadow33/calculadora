import { useState } from "react";

import { invoke } from "@tauri-apps/api/core";
import "./App.css";






export default function App() {
const [expr, setExpr] = useState("");
const [out, setOut] = useState<string | null>(null);


const append = (s: string) => setExpr((e) => e + s);
const clear = () => { setExpr(""); setOut(null); };
const del = () => setExpr((e) => e.slice(0, -1));


const evaluate = async () => {
try {
const res = await invoke<string>("compute", { expression: expr });
setExpr(res);
} catch (err) {
setOut("Error");
}
};


return (
<div className="app">
<h1>Calculadora</h1>


<div className="display">
<div className="expression">{expr || "0"}</div>
<div className="result">{out ?? ""}</div>
</div>


<div className="pad">
{["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((k) => (
<button
key={k}
className={k === "=" ? "equals" : undefined}
onClick={() => {
if (k === "=") evaluate();
else append(k);
}}
>
{k}
</button>
))}
</div>


<div className="actions">
<button onClick={clear}>C</button>
<button onClick={del}>DEL</button>
</div>
</div>
);
}
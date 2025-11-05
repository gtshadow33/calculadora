#[tauri::command]
fn compute(expression: String) -> Result<String, String> {
let expr = expression.replace(" ", "");


match meval::eval_str(expr) {
Ok(v) => Ok(v.to_string()),
Err(_) => Err("Error al calcular".to_string()),
}
}


fn main() {
tauri::Builder::default()
.invoke_handler(tauri::generate_handler![compute])
.run(tauri::generate_context!())
.expect("error al ejecutar la aplicación Tauri");
}
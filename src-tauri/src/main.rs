#[tauri::command]
fn compute(expression: String) -> Result<String, String> {
    let expr = expression.replace(" ", "");

    match meval::eval_str(expr) {
        Ok(v) => {
            // Si es entero, formatearlo sin decimales
            if v.fract() == 0.0 {
                Ok(format!("{}", v as i64))
            } else {
                Ok(format!("{:.3}", v)) // deja decimales naturales
            }
        }
        Err(_) => Err("Error al calcular".to_string()),
    }
}


fn main() {
tauri::Builder::default()
.invoke_handler(tauri::generate_handler![compute])
.run(tauri::generate_context!())
.expect("error al ejecutar la aplicación Tauri");
}
formulario=$(zenity --forms --title="Tmpfs ram" \
--text="Criar diretorio na mem virtual ram" \
--separator="," \
--add-entry="Aonde" \
--add-entry="Tamanho (mb)" \
)

IFS="," read -r aonde tamanho <<< "$formulario"
sudo mount -t tmpfs none $aonde -o rw,size=$tamanho


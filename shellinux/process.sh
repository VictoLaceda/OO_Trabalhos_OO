read name
read cpu

pids=($(ps waux | grep $name | awk '{print $2}'))
for pid in "${pids[@]}"; do
    taskset -pc $cpu "$pid"
done
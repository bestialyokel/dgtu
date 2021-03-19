declare -a Ranges=(10000 50000 200000 1000000)

declare -a Operations=(1000 5000 25000 100000)

set repeat = 50

rm ./results -rf;
mkdir results;


for r in "${Ranges[@]}"; do
    for o in "${Operations[@]}"; do
        for i in {1..50}; do
            escript -c bst.erl $r $o >> "./results/r_${r}_o=${o}"; echo "," >> "./results/r_${r}_o=${o}"; 
        done
    done
done

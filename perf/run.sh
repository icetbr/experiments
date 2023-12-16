# echo "Building"
# npx tsc || exit 1
# apt-get install linux-tools-common linux-tools-generic linux-tools-`uname -r`

echo "Disabling turboboost | 1"
echo 1 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo >/dev/null
cat /sys/devices/system/cpu/intel_pstate/no_turbo

echo "Enabling performance mode"
for i in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    echo performance | sudo tee $i >/dev/null
done
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

echo "Disabling hyperthreading (core 1) | 0"
echo 0 | sudo tee /sys/devices/system/cpu/cpu1/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu2/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu3/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu4/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu5/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu6/online >/dev/null
echo 0 | sudo tee /sys/devices/system/cpu/cpu7/online >/dev/null
lscpu | grep CPU\(s\)

echo "disable randomization"
echo 0 | sudo tee /proc/sys/kernel/randomize_va_space

## drop cache
echo 3 | sudo tee /proc/sys/vm/drop_caches && sync

echo "Running benchmark on core 0"
# Run node on cpu 0
sudo perf stat -- sudo nice -n -5 taskset -c 0 /home/ddv/.nvm/versions/node/v20.3.1/bin/node "$1"

# echo "drop cache"
# echo 3 | sudo tee /proc/sys/vm/drop_caches
# sync


# Revert changes

echo "Enabling turboboost | 0"
echo 0 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo >/dev/null
cat /sys/devices/system/cpu/intel_pstate/no_turbo

echo "Enabling hyperthreading (core 1) | 1"
echo 1 | sudo tee /sys/devices/system/cpu/cpu1/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu2/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu3/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu4/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu5/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu6/online >/dev/null
echo 1 | sudo tee /sys/devices/system/cpu/cpu7/online >/dev/null
lscpu | grep CPU\(s\)

echo "Enabling powersave mode"
for i in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    echo powersave | sudo tee $i >/dev/null
done
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

echo "enable randomization"
echo 2 | sudo tee /proc/sys/kernel/randomize_va_space

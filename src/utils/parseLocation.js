    const location = '강원도 춘천시 동면 지내리';
    const i = 0;
    const first = location.indexOf(' ', i); // 시,군
    const sidoName = location.substr(i, first);
    const second = location.indexOf(' ', i + first + 1);
    const sggName = location.substr(first + 1, second - first - 1);
    const third = location.indexOf(' ', i + second + 1);
    let umdName;
    if (third !== -1) { umdName = location.substr(second + 1, third - second - 1); } else { umdName = location.substr(second + 1, location.length - second - 1); }
    console.log ({
        sido_name: sidoName,
        sgg_name : sggName,
        umd_name : umdName,
    },'sido_name');
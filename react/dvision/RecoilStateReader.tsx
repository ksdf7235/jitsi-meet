import { useRecoilValue } from "recoil";

const RecoilStateReader = (data) => {
    const mark = useRecoilValue(data);
    return mark; // 또는 필요한 JSX 렌더링
};

export default RecoilStateReader;

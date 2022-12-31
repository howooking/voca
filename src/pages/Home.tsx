export default function Home(): JSX.Element {
  return (
    <ol>
      <li>
        Test컴포넌트가 처음 랜더링되면 db에서 1219개 토익단어가 랜덤순서로 섞임
      </li>
      <li>5개 단위로 slice되며 그 중 랜덤으로 한단어를 정답으로 지정</li>
      <li>정답/오답에 맞는 UI/UX구현</li>
      <li>정답시 각 단어 shownCount + 1</li>
      <li>오답시 각 단어 shownCount + 1, wrongCoung + 1</li>
      <li>틀린 단어는 로그인 한 아이디 별로 db에 저장</li>
      <li>틀린 단어 중 중요한 단어는 별표시 가능</li>
    </ol>
  );
}

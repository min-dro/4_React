import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import { callGpt } from './services/gptApi'

const inputStyle = {
  width: '60%',
  marginRight: '10px',
  height: '60px'
}

const resStyle = {
  width: '70%'
}
function App() {
  const [response, setResponse] = useState("");
  // 버튼을 여러번 누르지 못하게 하도록 처리하기 위한 상태
  const [isCalled, setIsCalled] = useState(false); 
  const inputRef = useRef();

  const callGptApi = async () => {
    setIsCalled(true);
    const inputVal = inputRef.current.value;
    const result = await callGpt(inputVal);

    setIsCalled(false);
    if (result !== undefined && 'choices' in result && result.choices.length > 0) {
      setResponse(result.choices[0].message.content);
    }
  }

  return (
    <div className="App">
      <p className='font'><span>My</span> <span>Chat</span> <span>Bot</span></p>
      <div>
        <input type='text' ref={inputRef} style={inputStyle} placeholder='내용을 입력해주세요'/>
        <button onClick={callGptApi} disabled={isCalled}>전송</button>
      </div>
      {/* <p>{process.env.REACT_APP_GPT_API_KEY}</p> */}
      <hr/>
      <textarea style={resStyle}
                rows={30}
                value={response}
                placeholder="GPT 답변 대기중..."
                readOnly></textarea>
    </div>
  );
}

export default App;

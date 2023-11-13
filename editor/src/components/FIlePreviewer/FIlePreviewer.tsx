import { fileAtom } from '@kaminiten-editor/domain/selectFile/fileAtom';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

function FIlePreviewer() {
  const [text, setText] = useState('');
  const [file] = useAtom(fileAtom);
  useEffect(() => {
    (async function read() {
      if (file) {
        const text = await file.text();
        setText(text);
      }
    })();
  });
  return <div>{text}</div>;
}

export default FIlePreviewer;

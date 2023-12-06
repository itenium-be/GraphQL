import { useState } from 'react';

async function runQuery(query, setResult) {
  setResult('')
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      // variables: {  },
    })
  })

  const body = await res.json()
  console.log('Result for ' + query.replace(/\s+/g, ''), body)
  setResult(JSON.stringify(body, null, 3))
  return body;
}


export function App() {
  const [query, setQuery] = useState('{ hello }');
  const [response, setResponse] = useState('');
  return (
    <>
      <div className="col">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Query</span>
          </div>
          <textarea className="form-control" rows={20} onChange={e => setQuery(e.target.value)}>
            {query}
          </textarea>
        </div>
      </div>
      <div className="col mt-3 text-center">
        <button type="button" className="btn btn-success me-3" onClick={() => runQuery(query, setResponse)}>Execute Query</button>
        <button type="button" className="btn btn-secondary" onClick={() => runQuery('{ schema }', setResponse)}>Get Schema</button>
      </div>
      {response && (
        <div className="col mt-3">
          <div className="alert alert-info">
            <b>Server Response</b>
            <br />
            <pre>{response.replace(/\\n/g, '\n')}</pre>
          </div>
        </div>
      )}
    </>
  );
}

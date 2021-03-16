export default function voteCard(id) {
  return fetch(`/cards/${id}/vote`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => (data.error ? Promise.reject(data) : data))
}

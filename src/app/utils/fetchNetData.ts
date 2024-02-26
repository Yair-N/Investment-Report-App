



export async function fetchData() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return data;
}
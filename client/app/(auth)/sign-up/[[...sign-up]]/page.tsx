export default async function SignUpPage() {
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "h@gmail.com",
        password: "123",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return (
      <div>
        {response.status} - {data.message || "Login successful"}
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Failed to log in</div>;
  }
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('backgrounds/DVRN Web Background.jpg')" }}
    >
      <div className="max-w-2xl bg[#334155]/80 backdrop-blur-md rounded-xl p-6 shadow-lg text-center text-white">
        <h1 className="text-3xl font-bold mb-4">About DVRN Music</h1>
        <p>
          Hello, my name is DVRN, I am from Indonesia, and I am a music producer.
          My main genre is Trap and Dubstep, sometimes I make hardstyle music,
          but yeah you know, that is not my main genre.
          <br /><br />
          I like video games, especially mobile games, like Mobile Legends: Bang Bang,
          Honkai Star Rail, Zenless Zone Zero, and other AAA games like the Assassins Creed Series.
          <br /><br />
          If you want to know more about me, you can contact me on the contact navigation.
        </p>
      </div>
    </div>
  );
}

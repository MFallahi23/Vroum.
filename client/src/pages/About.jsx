import React from "react";

const About = () => {
  return (
    <main className="my-10">
      <section>
        <div className=" max-w-[1000px] mx-auto p-3">
          <h1 className=" text-4xl capitalize font-semibold">About us</h1>
          <p className="my-5 ">
            This is not a real market app, it's a MERN project done by Mouhcine
            Fallahi.{" "}
          </p>
          <a
            className="bg-myOrange p-2 rounded-lg text-white"
            href="https://www.linkedin.com/in/mouhcine-fallahi-256686243/"
            target="_blank"
          >
            Contact me
          </a>
          <p className="mt-5 border-t pt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            dolorum facere eligendi necessitatibus cumque harum odit cupiditate
            ipsam rerum. Quis sint dicta at, aliquam illo similique est ducimus
            aspernatur, omnis tenetur, dolorum vel autem porro. Nobis, vel
            ratione. Vero, distinctio! Dolorem quo consequuntur, exercitationem
            sit aperiam hic voluptatum soluta iusto!
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;

import React from 'react';

const Page = ({ serverData }) => {
  return (
    <article>
      <div className="grid gap-4">
        <h2 className="text-brand-primary text-2xl font-black">Events</h2>
        <p>{serverData.something}</p>
      </div>
    </article>
  );
};

export default Page;

export async function getServerData() {
  return {
    status: 200,
    props: {
      something: 'test'
    }
  };
}

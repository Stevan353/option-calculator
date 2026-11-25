
export default {
  async fetch(request) {
    return new Response("Option Calculator Ready!", {
      headers: {
        "content-type": "text/plain"
      }
    });
  }
};


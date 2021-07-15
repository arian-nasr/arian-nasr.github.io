/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Motley Crew",
          artist: "Post Malone",
          cover: "/thumbnails/motleycrew.jpg",
          source: "/chorus/2.Motley_Crew.wav",
          url: "https://open.spotify.com/track/40uMIn2zJLAQhNXghRjBed?si=3eea07f9973542e4",
          favorited: false
        },
        {
          name: "Memory",
          artist: "Kane Brown, blackbear",
          cover: "/thumbnails/memory.jpg",
          source: "/chorus/13.Memory.wav",
          url: "https://open.spotify.com/track/34chhNX59Wo9HMFCsI3K8Y?si=6bcb0072d8b54852",
          favorited: false
        },
        {
          name: "Hood Baby",
          artist: "Supawassi, J Neat",
          cover: "/thumbnails/hoodbaby.jpg",
          source: "/chorus/69.Hood_Baby.wav",
          url: "https://open.spotify.com/track/5vQ6TwJiqQn87yObnmejML?si=02fe6ca8c5f740e2",
          favorited: false
        },
        {
          name: "Get Up",
          artist: "Logic",
          cover: "/thumbnails/getup.jpg",
          source: "/chorus/14.Get_Up.wav",
          url: "https://open.spotify.com/track/4khOYw0ka3gNzYCwMurq3C?si=24b5dda0870c43a6",
          favorited: false
        },
        {
          name: "That Feel",
          artist: "Lex Leosis",
          cover: "/thumbnails/thatfeel.jpg",
          source: "/chorus/97.That_Feel.wav",
          url: "https://open.spotify.com/track/6791eYqABRDIjIiCkr9P1m?si=c90491a0439b4292",
          favorited: false
        },
        {
          name: "Piece of Work",
          artist: "Loren Gray",
          cover: "/thumbnails/work.jpg",
          source: "/chorus/50.Piece_of_Work.wav",
          url: "https://open.spotify.com/track/0tLK0fFNlY43ntSpXjR8J0?si=262f32cbd29d4b19",
          favorited: false
        },
        {
          name: "NDA",
          artist: "Billie Eilish",
          cover: "/thumbnails/nda.jpg",
          source: "/chorus/4.NDA.wav",
          url: "https://open.spotify.com/track/6uqyE384HDSsuwpoF4mjrL?si=b71b408f41e9471e",
          favorited: false
        },
        {
          name: "I Can Only Whisper (feat. BADBADNOTGOOD)",
          artist: "Charlotte Day Wilson, BADBADNOTGOOD",
          cover: "/thumbnails/whispercanonly.jpg",
          source: "/chorus/1.I_Can_Only_Whisper_(feat._BADBADNOTGOOD).wav",
          url: "https://open.spotify.com/track/5qXwFOkT3lrEonTzsYCeZ1?si=8254f7ba02614588",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
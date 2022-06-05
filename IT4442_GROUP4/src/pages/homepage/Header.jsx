import "./header.css";
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Toolbar } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const history = useHistory();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
const memory = () => {
    history.push('/memory');
  }

// //   const post = () => {
// //     history.push('/post');
//   }
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    // <div className="header">
    //   <div className="headerTitles">
    //     <span className="headerTitleSm">React & Node</span>
    //     <span className="headerTitleLg">Blog</span>
    //   </div>
    //   <img
    //     className="headerImg"
    //     src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //     alt=""
    //   />
    <div>
              <header class="masthead text-center text-white">
            <div class="masthead-content">
                <div class="container px-5">
                    <h1 class="masthead-heading mb-0">Writing Diary Everyday</h1>
                    <h2 class="masthead-subheading mb-0">Will Make You More Happy</h2>
                    {user?.result ? (
                    <div>
                        <div>
                            {/* <span class="btn btn-primary btn-xl rounded-pill mt-5" onClick={post}>Post</span> */}
                            <span class="btn btn-primary btn-xl rounded-pill mt-5" onClick={memory}>Memories</span>
                        </div>
                    </div>
                    ) : (" ")}
                </div>
            </div>
            <div class="bg-circle-1 bg-circle"></div>
            <div class="bg-circle-2 bg-circle"></div>
            <div class="bg-circle-3 bg-circle"></div>
            <div class="bg-circle-4 bg-circle"></div>
        </header>
        <section id="scroll">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6 order-lg-2">
                        <div class="p-5"><img class="img-fluid rounded-circle" src="https://unlu.io/blog/wp-content/uploads/2021/04/WhatsApp-Image-2021-04-29-at-3.17.26-PM.jpeg" alt="" /></div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                        <div class="p-5">
                            <h2 class="display-4">Achieve your goals</h2>
                            <p>A journal is a good place to write your goals, ambitions, aspirations and new year resolutions. By keeping them in a diary, you can monitor your progress and feel motivated to continue to focus on your next milestone!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <div class="p-5"><img class="img-fluid rounded-circle" src="https://media.istockphoto.com/vectors/motivation-quote-lettering-postcard-about-life-template-for-banner-vector-id1224306941?s=612x612" alt="..." /></div>
                    </div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <h2 class="display-4">Memory can make you fun!</h2>
                            <p>Keeping a journal does improve your ability to recall the past. It keeps the memory fresh in your head. However it may only keep the memory fresh for a couple of weeks maybe months, depending on how memorable the memory is.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6 order-lg-2">
                        <div class="p-5"><img class="img-fluid rounded-circle" src="https://3.bp.blogspot.com/-kjQNm5Egyb4/WC-VWy_3akI/AAAAAAAAd8M/bOi0DkGD2psB_tN2vFnJYe3GbUrJf_U0gCLcB/s1600/Photography%2Bby%2BPam%2BDavis%2B2016%2Bat%2Bwww.SavoringTheSweetLife.com%2B-1.jpg" alt="..." /></div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                        <div class="p-5">
                            <h2 class="display-4">Save memory with famimy</h2>
                            <p>It's the best time to write diary to save memory with your family. As long as, start now !</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="py-5 bg-white">
            <div class="container px-5"><p class="m-0 text-center text-black small">Copyright &copy; Hedspi Team Fight</p></div>
        </footer>
    </div>

  );
}

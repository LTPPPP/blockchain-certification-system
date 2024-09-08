import React, { useEffect, useState } from 'react';

import img from '../img/template.png'

function User() {



    return (
        <div className='User__container'>
            <div className='row'>

                <div className="user__Info col l-3">
                    <div className="user__name">Hello, name</div>
                    <div className="user__code">#U001</div>
                    <div className="user__content">

                        <div>
                            <span>Name</span> Nguyen Van A
                        </div>

                        <div>
                            <span>Gender</span> Male
                        </div>

                        <div>
                            <span>Birth</span> 01-02-2004
                        </div>

                        <div>
                            <span>Address</span> 100 phhan chau trinh, viet nam
                        </div>

                        <div>
                            <span>Email</span> admin@gmail.com.vn
                        </div>

                    </div>
                </div>

                <div className="certification__container col l-9">

                    <div className="certification__title">Certification</div>

                    <div className="certification__list">
                        <div className='row'>
                            {/* xài vòng lặp ở đây */}
                            <div className="certification__item col l-3">
                                <div className="certification__link">
                                    <img src={img}></img>
                                </div>
                            </div>

                            <div className="certification__item col l-3">
                                <div className="certification__link">
                                    <img src={img}></img>
                                </div>
                            </div>

                            <div className="certification__item col l-3">
                                <div className="certification__link">
                                    <img src={img}></img>
                                </div>
                            </div>


                            <div className="certification__btn col l-12">
                                <button>Add Certificate</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default User;

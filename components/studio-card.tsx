import React from 'react'
import { Flex } from './ui/flex'

const StudioCard = () =>
{
      return (
            <div>
                  <div className="roots">
                        <div className="card roots_card">
                              <p className="roots_card-header">
                                    welcome to bob studio.
                              </p>

                              <Flex className="roots_card-footer">
                                    <p className="roots_card-footer">
                                          welcome to bob studio.
                                    </p>
                              </Flex>
                        </div>
                  </div>

                  <style jsx>
                        {`
                        .roots{
                              background-color: red;
                              padding: 40px;

                              
                        }

                        .roots_card{
                                    background-color: green;
                                    padding: 40px;
                              }
                        `}
                  </style>

            </div>
      )
}

export default StudioCard
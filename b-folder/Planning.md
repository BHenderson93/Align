

**************************************************************************************

    User logs in

***
    User is greeted with featured jobs page

    ***
        DB call to find Users data
            Keywords - taken from Resume or input by User
            Resume returned for processing after API call
            Would be nice to have list of applied jobs so API omits repeat results

    ***
        API makes GET request to remotive/indeed requesting list of matching User Keywords as query params
            JSON is returned containing that job list which may need some processing

    ***
        Each Job in list is processed and compared with User Resume - Job Keywords may be attached within their JSON
            Initial resume size of 1 page or 2 pages is specified beforehand by User
            Each line is assigned priority of essential, high prio (+2 algo score), or optimizable by User.
            Each line in nonessential sections is given an algorithmic score.
            Each main item - such as a project - gets a score of the sum of their lines.

            Iterate through whole doc:

                Remove:
                    Lowest scoring or last main item if above section max items and non essential.
                    Lowest scoring or last line starting at oldest main items if non essential and main item still above min items.

                if space constraints met or unable to delete further: break.
                return distilled resume to user
    ***
        Take template coverletter and insert company name, other templating details into the letter, perhaps with a user prompt - such as 'complete this sentence about company culture then submit'.

    ***
        Repeat processing for each job in list, providing customized resume/cover letter.

    ***
        ALTERNATIVELY
            Only run this process when User clicked on a featured job. Have users job search params be a combination of the words used in their resume



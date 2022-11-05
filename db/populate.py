from utils import get_details, get_course_ids, get_prereqs, \
    get_crosslistings, insert_details
from constants import *

'''

================== TODO ==================

1. choose terms to use, put into list
2. in a loop, go from newest to oldest term,
   getting course ids and their details.
   maintain prereqs and course id dicts. skip over
   seen class codes in course id dict.
   insert details into db at the end of every term.
3. create graph from prereq and course id dicts
4. insert all dicts into the database (write util)

'''

# eco300 = get_details(FALL22, "001388")
# print(get_prereqs(eco300))
# insert_details([eco300])

from utils import get_details, get_course_ids, get_prereqs, \
    get_crosslistings, insert_details, insert_graph
from constants import *

terms = [FALL22]

id_to_prereq_codes = {} # course_id => [course codes]
prereq_code_to_id = {} # course code => course_id
graph = {} # course_id => [course_ids]

'''

{"12345": ["COS 126"], "54321": []}

{"COS 226": "12345",
"COS 126": "54321",
"ECE 226": "12345"}

'''

for term in terms[::-1]:
    course_ids = get_course_ids(term)
    course_details = []
    for course_id in course_ids:
        course_detail = get_details(term, course_id)
        id_to_prereq_codes[course_id] = get_prereqs(course_detail)
        for crosslisting in get_crosslistings(course_detail):
            prereq_code_to_id[crosslisting] = course_id
        course_details.append(course_detail)
    insert_details(course_details)

for key, arr in id_to_prereq_codes.items():
    graph[key] = list(map(lambda x: prereq_code_to_id[x], arr))

print(graph)
insert_graph(graph)

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

from utils import *

current_term = get_current_term()
metadata = get_metadata()

if metadata["current_term"] == current_term:
    exit()

terms = update_metadata(current_term, metadata)

id_to_prereq_codes = {} # course_id => [course codes]
prereq_code_to_id = {} # course code => course_id
prereq_graph = {} # course_id => [course_ids]

term_course_ids = list(map(lambda term: get_course_ids(term), terms))

for i, term in enumerate(terms):
    print(f"Started term {term}")
    course_ids = term_course_ids[i]
    course_details = []
    for course_id in course_ids:
        course_detail = get_details(term, course_id)
        if course_detail["subject"] + course_detail["catnum"] in prereq_code_to_id \
             or course_id in id_to_prereq_codes:
            continue
        id_to_prereq_codes[course_id] = get_prereqs(course_detail)
        for crosslisting in get_crosslistings(course_detail):
            prereq_code_to_id[crosslisting] = course_id
        course_details.append(course_detail)
        if len(course_details) % 25 == 0:
            print(f"{len(course_details)} completed")
    insert_details(course_details, current_term)
    print(f"Inserted {len(course_details)} course details")

for key, arr in id_to_prereq_codes.items():
    id_arr = []
    for code in arr:
        if code in prereq_code_to_id:
            id_arr.append(prereq_code_to_id[code])
    if id_arr:
        prereq_graph[key] = id_arr

postreq_graph = get_transpose(prereq_graph)

drop_collection("graph")

prereq_graph["_id"] = "prereq"
insert_graph(prereq_graph)
print("Inserted prereq graph")

postreq_graph["_id"] = "postreq"
insert_graph(postreq_graph)
print("Inserted postreq graph")

drop_collection("details")
rename_collection(current_term, "details")

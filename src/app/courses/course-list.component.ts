import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({
    // selector: 'app-course-list',
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    filteredCourses: Course[] = [];

    _courses: Course[] = [];

    
    _filterBy: string;

    constructor(private courseService: CourseService){ }

    ngOnInit(): void {

        this.retriveAll();
    }

    retriveAll(): void {
        this.courseService.retreiveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('Error', err)
        })
    }

    set filter(value: string) {
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLowerCase().indexOf(this._filterBy.toLowerCase()) > -1)
    }

    get filter() {
        return this._filterBy;
    }

}
package models

// HeritageType struct
type Heritage_Type struct {
	ID          int    `json:"id" gorm:"column:id;"`
	Name        string `json:"name" gorm:"column:name;"`
	Description string `json:"description" gorm:"column:description;"`
	UrlSlug     string `json:"urlslug" gorm:"column:urlslug;"`
}

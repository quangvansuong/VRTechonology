package models

// Heritage struct
type Heritage struct {
	ID                   int               `json:"id" gorm:"column:id;"`
	Name                 string            `json:"name" gorm:"column:name;"`
	Short_Description    string            `json:"short_description" gorm:"column:short_description;"`
	Times                string            `json:"time" gorm:"column:time;"`
	Image_360_URL        string            `json:"image_360_url" gorm:"column:image_360_url;"`
	UrlSlug              string            `json:"urlslug" gorm:"column:urlslug;"`
	VideoURL             string            `json:"video_url" gorm:"column:video_url;"`
	Location_ID          int               `json:"location_id" gorm:"column:location_id;"`
	Management_Unit_ID   int               `json:"management_unit_id" gorm:"column:management_unit_id;"`
	Heritage_Type_ID     int               `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
	Heritage_Category_ID int               `json:"heritage_category_id" gorm:"column:heritage_category_id;"`
	View_Count           int               `json:"view_count" gorm:"column:view_count;"`
	HeritageCategory     Heritage_Category `json:"heritage_category" gorm:"foreignKey:heritage_category_id"`
	HeritageType         Heritage_Type     `json:"heritage_type" gorm:"foreignKey:heritage_type_id"`
	Location             Location          `json:"location" gorm:"foreignKey:location_id"`
	ManagementUnit       Management_Unit   `json:"management_unit" gorm:"foreignKey:management_unit_id"`
	Images               []string          `json:"images" gorm:"-"`
}

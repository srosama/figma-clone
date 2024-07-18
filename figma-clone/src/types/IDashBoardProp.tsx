export type SideNavBarProp = {
    onRecentClick: ()=> void,
    onDraftClick: ()=> void,
    recActive: boolean,
    draftActive: boolean,
}

export type ContentProp = {
    recentOrDraft: string
}

export type DesignFileProp = {
    id: number,
    fileName: string,
    createdAt: Date,
    updatedAt: Date,
    thumbnail: string,    
}
module.exports = () => {
    const prefix = "release:"
            
    if (context.payload.issue.labels.length > 1) {
      await github.issues.createComment({
          issue_number: context.issue.number,
          owner: context.repo.owner,
          repo: context.repo.repo,
          body: 'Please add only one label'
      })
      throw new Error("More than one label provided")
    }
    
    const increment_level = context.payload.issue.labels.find(label => label.name.startsWith(prefix) )
    
    if (!increment_level) {
      await github.issues.createComment({
          issue_number: context.issue.number,
          owner: context.repo.owner,
          repo: context.repo.repo,
          body: 'Please add a bump Version'
      })
      throw new Error("Missing bump Version")
    }
    
    const bump_level = increment_level.substr(prefix.length)
    console.log(`::set-output name=bump_level::${bump_level}`)};
}